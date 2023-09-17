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
import { useEffect, useState } from 'react';

type Live = {
  id: string;
  videoId: string;
  title: string;
  link: string;
  author: string;
  pubDate: string;
  isoDate: string;
};

export default function LivesTable() {
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

  if (lives.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Table selectionMode="single">
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
            <TableCell>{live.pubDate}</TableCell>
            <TableCell>
              <Button color="primary" size="sm">
                NOTIFY
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
