import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2 } from "lucide-react";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { articleFilterSchema } from "../../schema/zod";
import { z } from "zod";
import { useFetchArticles } from "../../hooks/useArticles";
import { Article } from "../../hooks/fetchArticles";

type ArticleFilterFormSchema = z.infer<typeof articleFilterSchema>;

interface ArticleFilterProps {
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}

const ArticleFilter = ({ setArticles }: ArticleFilterProps) => {
  const form = useForm<ArticleFilterFormSchema>({
    resolver: zodResolver(articleFilterSchema),
  });

  const { mutation, formStatus } = useFetchArticles();

  const onSubmit: SubmitHandler<ArticleFilterFormSchema> = (values) => {
    const { source = "all", ...restValues } = values;
    formStatus.setFormLoading(true);

    mutation.mutate({ ...restValues, source }, {
      onSuccess: (articles) => {
        setArticles(articles);
        formStatus.setFormLoading(false);
      },
      onError: (error) => {
        console.error("Error fetching articles:", error);
        formStatus.setFormLoading(false);
      },
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filter Articles</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keyword</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter keyword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-col md:flex-row flex justify-between gap-4">
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date Range</FormLabel>
                    <DatePickerWithRange
                      className="w-full"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>News Source</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || "all"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a news source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newsApi">NewsAPI</SelectItem>
                          <SelectItem value="theGuardian">The Guardian</SelectItem>
                          <SelectItem value="nyTimes">New York Times</SelectItem>
                          <SelectItem value="all">All Sources</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              disabled={formStatus.isFormLoading}
              type="submit"
              className="w-full text-white"
            >
              {formStatus.isFormLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Fetch Articles"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ArticleFilter;
