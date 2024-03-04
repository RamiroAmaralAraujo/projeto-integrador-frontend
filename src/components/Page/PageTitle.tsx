interface PageTitleProps {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="font-semibold text-base-background text-3xl ">{title}</h1>
}
