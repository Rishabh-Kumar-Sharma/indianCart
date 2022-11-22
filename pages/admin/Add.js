import React, { useState } from "react";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
  const [form, setForm] = useState({});
  const handleChange = () => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    // let a = fetch() complete it!
  };
  return (
    <>
      <Head>
        <title>IndianCart | Add Product(s)</title>
      </Head>
      <style jsx global>
        {`
          footer {
            display: none;
          }
        `}
      </style>
      <ThemeProvider theme={theme}>
        <FullLayout>
          {/* <h1 className="text-lg text-center font-bold">Add a Product</h1> */}
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add a Product">
                <Stack spacing={3}>
                  <TextField
                    value={form.title && form.title}
                    name="title"
                    label="Title"
                    variant="outlined"
                    onChange={handleChange}
                    // defaultValue=""
                  />
                  <TextField
                    value={form.size ? form.size : ""}
                    name="size"
                    label="Size"
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    value={form.type ? form.type : ""}
                    onChange={handleChange}
                    name="type"
                    label="Type"
                    variant="outlined"
                  />
                  <TextField
                    value={form.color ? form.color : ""}
                    onChagne={handleChange}
                    name="color"
                    label="Color"
                    variant="outlined"
                  />
                  <TextField
                    value={form.slug ? form.slug : ""}
                    onChange={handleChange}
                    name="slug"
                    label="Slug"
                    variant="outlined"
                  />
                  <TextField
                    value={form.description ? form.description : ""}
                    name="description"
                    label="Description"
                    onChange={handleChange}
                    multiline
                    rows={4}
                    defaultValue=""
                  />
                  {/* <TextField value={form.title}
                    error
                    name="er-basic"
                    label="Error"
                    defaultValue="ad1avi"
                    variant="outlined"
                  /> */}

                  {/* <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Terms & Condition"
                    />
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label="Disabled"
                    />
                  </FormGroup> */}
                  {/* <FormControl>
                    <FormLabel name="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl> */}
                </Stack>
                <br />
                <Button variant="outlined" mt={2} onClick={submitForm}>
                  Submit
                </Button>
              </BaseCard>
            </Grid>

            {/* <Grid item xs={12} lg={12}>
              <BaseCard title="Form Design Type">
                <Stack spacing={3} direction="row">
                  <TextField value={form.title}
                    name="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  />
                  <TextField value={form.title}
                    name="filled-basic"
                    label="Filled"
                    variant="filled"
                  />
                  <TextField value={form.title}
                    name="standard-basic"
                    label="Standard"
                    variant="standard"
                  />
                </Stack>
              </BaseCard>
            </Grid> */}
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default Add;
