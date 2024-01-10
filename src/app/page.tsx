"use client";

import { Checkbox, Unstable_Grid2 as Grid, OutlinedInput } from "@mui/material";

import type { Metadata } from "next";
import { inter } from "@/app/ui/fonts";
import "./globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Box,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { fetchAuth } from "../lib/datas";
import { getDecryptedToken } from "../lib/utlis";
import backgroundImage from "../../public/login-image.svg";
import { useMediaQuery } from "@mui/material";

export default function Page() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const router = useRouter();
  // redirectToDashboard();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [method, setMethod] = useState("email");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // start new ui changes
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // end new ui changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getDecryptedToken();
        // console.log(token);

        if (token && token.data) {
          try {
            const jsonToken = JSON.parse(token.data);
            // console.log(jsonToken);
            // Check if jsonToken.data exists
            if (jsonToken.data) {
              router.push("/dashboard");
              return; // Exit the function to prevent further execution
            }
          } catch (error) {
            console.error("Error parsing JSON token:", error);
          }
        }

        // If any of the checks fail, redirect to the default route
        router.push("/");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const crenditials = { email, password };
    console.log(crenditials);
    // alert(`>>>>>>>>>${email}>>>>${password}`);
    const response = await fetchAuth(crenditials);

    if (response.statusCode == 200) {
      // console.log("passing");
      setLoading(true);
      router.push("/dashboard");

      // setTimeout(() => {
      //   router.push("/dashboard");
      //   // setLoading(false);
      // }, 2000);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <div className="">
        <div className="grid grid-cols-12">
          <div className="hidden md:block col-span-6 h-screen">
            <div
              className="flex items-center justify-center"
              style={{
                // use the src property of the image object
                backgroundImage: `url(${backgroundImage.src})`,
                // other styles
                // backgroundPosition: "center",
                // backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <div className="">
                <h1 className="font-[700] text-[64px] text-[#F4FDFA] w-[547px] drop-shadow-lg">
                  Bringing Food To Your Table
                </h1>
                <p className="text-[#D95B3F] text-[34px] font-semibold drop-shadow-lg">
                  Since 1987
                </p>
                <p className="text-white text-[18px]">
                  Kee Song Food Corporation (s) Pte Ltd
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 m-5 md:m-0 md:col-span-6 h-screen flex items-center justify-center">
            <div className="w-[600px]">
              <div className="flex justify-center md:block">
                <Image
                  src={"/logo.png"}
                  width={isMobile ? 93.07 : 156.75}
                  height={isMobile ? 67.56 : 102}
                  // width={156.75}
                  // height={102}
                  alt=""
                />
              </div>
              <div className="mt-[56px] mb-[38px]">
                <p className="text-[#D95B3F] text-[21.38px] md:text-[34px] font-semibold drop-shadow-lg">
                  Log in
                </p>
                <p className="text-12px md:text-[16px] text-[#919191]">
                  Please login with user name and password to continue
                </p>
              </div>

              {/* input boxs */}
              <div className="">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    sx={{ marginBottom: "40px" }}
                    error={error}
                    className="mb-[38px]"
                    id="outlined-basic"
                    label="User name or email address"
                    variant="outlined"
                    color="success"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <FormControl sx={{ width: "25ch" }} variant="outlined">
                    <InputLabel
                      error={error}
                      color="success"
                      htmlFor="outlined-adornment-password"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      error={error}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      color="success"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Box>
              </div>

              {/* accept terms and conditions */}
              {/* <div className="flex items-center justify-between mt-[8px] mb-[38px]">
                <div className="flex items-center">
                  <Checkbox {...label} />
                  <p className="text-[16px] text-black">
                    I accept the Terms and Conditions
                  </p>
                </div>

                <div className="">
                  <p className="text-[16px] text-[#42A5F5]">Forgot Password?</p>
                </div>
              </div> */}

              {/* button */}
              <div className="mt-[40px]">
                <Button
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#43A047",
                    textTransform: "none",
                  }}
                  sx={{ height: "50px" }}
                  className="text-[16px]"
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? "Submitting" : "Login"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
