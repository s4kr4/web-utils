import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Button,
  Spinner,
} from '@nextui-org/react';
import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import React, { ComponentProps, useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const getLives = async () => {
    try {
      setIsLoading(true);
      const rawLives = await axios.get<AxiosResponse<Live[]>>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lives/data`,
      );
      setLives(rawLives.data.data);
      setLastUpdated(new Date());
    } catch (error) {
      console.warn(error);
    }
    setIsLoading(false);
  };

  // 初回実行と定期実行のセット
  useEffect(() => {
    getLives();
  }, []);
  useInterval(getLives, 60 * 1000);

  const onClickNotify = async (videoId: string) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/lives/notify`, {
      videoId,
    });
  };

  if (lives.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <article className={className}>
      <div className="flex items-center">
        <Button disabled={isLoading}>{isLoading ? 'Loading' : 'Update'}</Button>
        {lastUpdated && (
          <span className="ml-2 text-sm">
            {`Updated: ${dayjs(lastUpdated).format('YYYY/MM/DD HH:mm:ss')}`}
          </span>
        )}
        {isLoading && <Spinner size="sm" className="ml-2" />}
      </div>
      <Table
        className="mt-2"
        selectionMode="single"
        aria-label="YouTube lives table"
      >
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
    </article>
  );
};
