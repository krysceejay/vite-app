import Table from '../../../components/shared/Table'
import PageTopOne from '../../../components/shared/PageTopOne'

export default function Transfers() {
  return (
    <section className="flex-grow">
      <PageTopOne title="Transfers" buttonText="New Transfer" link="/transfers/new" hasBtn />
      <section className="mt-11">
        <Table showSearch={true} pageName="Transfers" />
      </section>
    </section>
  )
}
