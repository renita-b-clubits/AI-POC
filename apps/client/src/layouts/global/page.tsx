import PageTitle from "./page-title";
import PageContent from "./page-content";

export const Page = () => {
  return (
    <div className="vstack h-100 w-100 bg-body-tertiary">
      <PageTitle />

      <PageContent />
    </div>
  );
};

export default Page;
