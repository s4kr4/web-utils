import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Button,
} from '@nextui-org/react';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import React, { ComponentProps, useEffect, useState } from 'react';

type Live = {
  id: string;
  videoId: string;
  title: string;
  link: string;
  author: string;
  pubDate: string;
  isoDate: string;
};

type Props = {
  className?: string;
} & ComponentProps<'table'>;

export const LivesTable: React.FC<Props> = ({ className }) => {
  const [lives, setLives] = useState<Live[]>([]);
  useEffect(() => {
    const getLives = async () => {
      try {
        const rawLives = await axios.get<AxiosResponse<Live[]>>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/lives/data`,
        );
        setLives(rawLives.data.data);
      } catch (error) {
        console.warn(error);
      }
    };
    getLives();
  }, []);

  const onClickNotify = async (videoId: string) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/lives/notify`, {
      videoId,
    });
  };

  if (lives.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Table selectionMode="single" className={className}>
      <TableHeader>
        <TableColumn>TITLE</TableColumn>
        <TableColumn>LINK (VIDEO ID)</TableColumn>
        <TableColumn>PUB DATE</TableColumn>
        <TableColumn>NOTIFY</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No data.'}>
        {lives.map((live) => (
          <TableRow key={live.id}>
            <TableCell>{live.title}</TableCell>
            <TableCell>
              <Link href={live.link} target="_blank">
                {live.videoId}
              </Link>
            </TableCell>
            <TableCell>
              {dayjs(live.pubDate).format('YYYY/MM/DD HH:mm:ss')}
            </TableCell>
            <TableCell>
              <Button
                color="primary"
                size="sm"
                onClick={() => onClickNotify(live.videoId)}
              >
                NOTIFY
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
