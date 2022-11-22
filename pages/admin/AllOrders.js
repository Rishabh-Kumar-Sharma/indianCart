import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

const AllOrders = () => {
  return (
    <>
      <Head>
        <title>IndianCart | View Orders</title>
      </Head>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <ProductPerfomance />
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default AllOrders;
