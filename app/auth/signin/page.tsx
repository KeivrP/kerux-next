"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/zod";
import LoadingButton from "@/components/loading-button";
import {
    handleCredentialsSignin,
} from "@/app/actions/authActions";
import { useState } from "react";
import ErrorMessage from "@/components/error-message";
import { Building2 } from "lucide-react";

export default function SignIn() {
    const [globalError, setGlobalError] = useState<string>("");
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            const result = await handleCredentialsSignin(values);
            if (result?.message) {
                setGlobalError(result.message);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#142F62] via-[#575E71] to-[#001944] flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-full shadow-lg">
                <Building2 className="h-12 w-12 text-[#142F62]" />
              </div>
            </div>
            
            <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-t-4 border-t-[#142F62]">
              <CardHeader>
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-[#142F62]">
                    Bienvenido
                  </h1>
                  <p className="text-[#575E71]">
                    Ingrese sus credenciales para acceder al sistema
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                {globalError && <ErrorMessage error={globalError} />}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#142F62] font-medium">
                            Correo Electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="correo@empresa.com"
                              className="h-10 border-[#d9e2ff] focus:border-[#142F62] focus:ring-[#142F62]"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#142F62] font-medium">
                            Contraseña
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="h-10 border-[#d9e2ff] focus:border-[#142F62] focus:ring-[#142F62]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
    
                    <div className="pt-2">
                      <LoadingButton pending={form.formState.isSubmitting} />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }