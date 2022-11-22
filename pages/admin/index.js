import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import mongoose from "mongoose";
import Product from "../../models/product";

export default function Index({ products }) {
  return (
    <>
      <Head>
        <title>IndianCart | Admin Panel</title>
      </Head>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <SalesOverview />
            </Grid>
            {/* ------------------------- row 1 ------------------------- */}
            <Grid item xs={12} lg={4}>
              <DailyActivity />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ProductPerfomance products={products} />
            </Grid>
            <Grid item xs={12} lg={12}>
              <BlogCard />
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    // checking if there already exists a connection
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
