"use client";

import React, { useRef } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { pageLinks } from "@/lib/constants";

import {
  useInitData,
  useMainButton,
  usePopup,
  useThemeParams,
} from "@tma.js/sdk-react";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { supabase } from "@/supabase";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const formSchema = z.object({
  cargo: z.string().min(4, {
    message: "Выберите один из вариантов.",
  }),
  curr: z.string().min(3, {
    message: "Выберите один из вариантов.",
  }),
  details: z
    .string()
    .max(300, {
      message: "Максимум 300 символов",
    })
    .optional(),
  price: z.string().min(3, {
    message: "Цена должна быть указана",
  }),
  from: z.string().min(1, {
    message: "Место погрузки не может быть пустым.",
  }),
  to: z.string().min(1, {
    message: "Место выгрузки не может быть пустым.",
  }),
});

export const OrderForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const mainButton = useMainButton();
  const popUp = usePopup();
  const theme = useThemeParams();
  const submitRef = useRef<HTMLButtonElement>(null);
  const [isRoundtrip, setIsRoundtrip] = React.useState(false);
  const [isPrepayment, setIsPrepayment] = React.useState(false);

  const initData = useInitData();

  const username = initData?.user?.username;
  const owner = initData?.user?.id;

  const date = new Date().toLocaleString();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const orderInfo = {
      userId: owner as number,

      date: date,
      status: "active",
      roundtrip: isRoundtrip,
      prepayment: isPrepayment,
      owner: username as string,
    };

    const order = {
      ...orderInfo,
      ...values,
    };

    try {
      const { data, error } = await supabase.from("orders").insert(order);
      popUp.open({
        title: t("orderForm.success"),
        message: `${order.date}`,
      });
      router.push("/");
    } catch (error) {
      popUp.open({
        title: "Error",
        message: `fail --- ${error}`,
      });
    }
  }

  React.useEffect(() => {
    const listener = () => submitRef.current?.click();
    mainButton.on("click", listener);
    mainButton.show();
    mainButton.setText(t("orderForm.submit"));
    mainButton.enable();
    return () => {
      mainButton.off("click", listener);
      mainButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form
        style={{ color: theme.textColor! }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-screen flex-col gap-3 p-2"
      >
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-3">
              <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                {t("orderForm.from")}
              </FormLabel>
              <Input
                placeholder={t("orderForm.description")}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-3">
              <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                {t("orderForm.to")}
              </FormLabel>
              <Input
                placeholder={t("orderForm.description")}
                onChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Label>{t("orderForm.fromto")}</Label>
          <Checkbox
            style={{ borderColor: theme.buttonColor! }}
            checked={isRoundtrip}
            onCheckedChange={() => setIsRoundtrip((prev) => !prev)}
          />
          <span>{t("orderForm.yes")}</span>
        </div>
        <FormField
          control={form.control}
          name="cargo"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-3">
              <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                {t("orderForm.body.name")}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger style={{ borderColor: theme.buttonColor! }}>
                    <SelectValue placeholder={t("orderForm.body.choose")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  style={{
                    backgroundColor: theme.backgroundColor!,
                    color: theme.textColor!,
                    borderColor: theme.buttonColor!,
                  }}
                >
                  {pageLinks.map((item) => (
                    <SelectItem id={item.name} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-3">
              <FormLabel>{t("orderForm.details")}</FormLabel>
              <FormControl>
                <Textarea
                  style={{ borderColor: theme.buttonColor! }}
                  placeholder={t("orderForm.detdes")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Label>{t("orderForm.prepay")}</Label>
          <Checkbox
            style={{ borderColor: theme.buttonColor! }}
            checked={isPrepayment}
            onCheckedChange={() => setIsPrepayment((prev) => !prev)}
          />
          <span>{t("orderForm.yes")}</span>
        </div>
        <div className="flex w-full items-center gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start space-y-3">
                <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  {t("orderForm.price")}
                </FormLabel>
                <FormControl>
                  <Input inputMode="numeric" className="w-[240px]" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="curr"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start space-y-3 ">
                <FormLabel className="after:ml-0.5 after:text-red-500 after:content-['*']">
                  {t("orderForm.curr")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger style={{ borderColor: theme.buttonColor! }}>
                      <SelectValue placeholder={t("orderForm.choose")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    style={{
                      backgroundColor: theme.backgroundColor!,
                      color: theme.textColor!,
                      borderColor: theme.buttonColor!,
                    }}
                  >
                    <SelectItem id="usd" value="USD">
                      USD
                    </SelectItem>
                    <SelectItem id="uzs" value="UZS">
                      UZS
                    </SelectItem>
                    <SelectItem id="rub" value="RUB">
                      RUB
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <Button ref={submitRef} className="hidden" type="submit">
          Подтвердить
        </Button>
      </form>
    </Form>
  );
};
