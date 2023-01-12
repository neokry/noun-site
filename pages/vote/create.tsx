import Layout from "@/components/Layout";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Formik,
  Field,
  Form,
  FormikHelpers,
  useField,
  FieldArray,
} from "formik";
import { TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";

const RichTextEditor = dynamic(() => import("@mantine/rte"), {
  ssr: false,
  loading: () => null,
});

interface Transaction {
  address: string;
  valueInETH: number;
}

interface Values {
  title: string;
  summary: string;
  transactrions: Transaction[];
}

export default function Create() {
  return (
    <Layout>
      <div className="text-4xl font-bold relative font-heading text-skin-base">
        Submit proposal
      </div>

      <Formik
        initialValues={{ title: "", transactions: [], summary: "" }}
        onSubmit={async () => {}}
        render={({ values }) => (
          <Form className="mt-6 flex flex-col">
            <label className="relative text-md font-heading text-skin-base">
              Proposal title
            </label>

            <Field
              name="title"
              placeHolder="My New Proposal"
              className="bg-skin-muted text-skin-base placeholder:text-skin-muted px-3 py-3 rounded-lg w-full text-md mt-2 focus:outline-none"
            />

            <label className="relative text-md font-heading text-skin-base mt-6">
              Transactions
            </label>

            <FieldArray
              name="transactions"
              render={(arrayHelpers) => (
                <div className="mt-2">
                  {values.transactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="mb-4 border p-4 rounded-md flex flex-col"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-sm w-52">Recipent</label>
                        <button onClick={() => arrayHelpers.remove(index)}>
                          <XMarkIcon className="h-6" />
                        </button>
                      </div>
                      <Field
                        name={`transactions[${index}].address`}
                        placeHolder="0x04bfb0034F24E424489F566f32D1f57647469f9E"
                        className="bg-skin-muted text-skin-base placeholder:text-skin-muted px-3 py-3 rounded-lg w-full text-md mt-2 focus:outline-none"
                      />

                      <label className="text-sm mt-4">Value</label>
                      <div className="flex items-center mt-2">
                        <Field
                          name={`transactions.${index}.valueInETH`}
                          placeHolder="0.1"
                          type="number"
                          className="bg-skin-muted text-skin-base placeholder:text-skin-muted px-3 py-3 rounded-l-lg w-full text-md focus:outline-none"
                        />
                        <label className="bg-skin-muted h-12 flex items-center border-l px-4">
                          ETH
                        </label>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      arrayHelpers.push({ address: "", valueInETH: 0 })
                    }
                    className={`bg-skin-muted text-skin-muted rounded-lg text-md w-full h-12 mt-4 flex items-center justify-around`}
                  >
                    Add Transaction
                  </button>
                </div>
              )}
            />

            <label className="relative text-md font-heading text-skin-base mt-6">
              Summary
            </label>

            <HTMLTextEditor />

            <button
              type="submit"
              className={`bg-skin-button-accent hover:bg-skin-button-accent-hover text-skin-inverted rounded-lg text-md w-full h-12 mt-4 flex items-center justify-around`}
            >
              Submit Proposal
            </button>
          </Form>
        )}
      />
    </Layout>
  );
}

const HTMLTextEditor = () => {
  const props = { name: "summmary", type: "text" };
  const [field] = useField(props);

  return (
    <RichTextEditor
      controls={[
        ["bold", "italic", "underline", "link"],
        ["unorderedList", "h1", "h2", "h3"],
      ]}
      className="mt-2 min-h-[250px]"
      {...field}
      {...props}
    />
  );
};
