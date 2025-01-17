type TypographyH4Props = {
  children: React.ReactNode;
};

const TypographyH4 = ({ children }: TypographyH4Props) => {
  return (
    <h3 className="text-xl font-semibold tracking-tight scroll-m-20 text-foreground mb-6">
      {children}
    </h3>
  );
};

export default TypographyH4;
