import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";
import mongoose from "mongoose";
import Product from "../../models/product";

const Allproducts = ({products}) => {
  // const products = [
  //   {
  //     id: "1",
  //     name: "Sunil Joshi",
  //     post: "Web Designer",
  //     pname: "Elite Admin",
  //     priority: "Low",
  //     pbg: "primary.main",
  //     budget: "3.9",
  //   },
  //   {
  //     id: "2",
  //     name: "Andrew McDownland",
  //     post: "Project Manager",
  //     pname: "Real Homes WP Theme",
  //     priority: "Medium",
  //     pbg: "secondary.main",
  //     budget: "24.5",
  //   },
  //   {
  //     id: "3",
  //     name: "Christopher Jamil",
  //     post: "Project Manager",
  //     pname: "MedicalPro WP Theme",
  //     priority: "High",
  //     pbg: "error.main",
  //     budget: "12.8",
  //   },
  //   {
  //     id: "4",
  //     name: "Nirav Joshi",
  //     post: "Frontend Engineer",
  //     pname: "Hosting Press HTML",
  //     priority: "Critical",
  //     pbg: "success.main",
  //     budget: "2.4",
  //   },
  // ];
  return (
    <>
      <Head>
        <title>IndianCart | View Products</title>
      </Head>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <ProductPerfomance products={products} />
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

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
export default Allproducts;
