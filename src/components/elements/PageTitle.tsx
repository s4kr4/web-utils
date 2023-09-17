type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props) => {
  return <h1 className="font-bold text-3xl">{title}</h1>;
};
