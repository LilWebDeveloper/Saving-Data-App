import DataTable from "../components/DataTable";
import Forms from "../components/Forms";
import Search from "../components/Search";
import classes from "../styles/Forms.module.css";

export default function Home() {
  return (
    <div className={classes.formStyle}>
      <Forms />
      <Search />
      <DataTable />
    </div>
  );
}
