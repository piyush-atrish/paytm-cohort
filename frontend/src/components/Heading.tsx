interface HeadingProps {
  label: string;
}

const Heading = ({ label }: HeadingProps) => {
  return (
    <h1 className="text-4xl font-bold text-center text-black pt-2">
      {label}
    </h1>
  )
}

export default Heading;