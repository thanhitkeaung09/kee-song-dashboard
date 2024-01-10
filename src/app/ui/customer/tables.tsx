import Image from "next/image";
import { UpdateProduct, DeleteProduct } from "@/app/ui/product/buttons";
import { formatDateToLocal } from "@/lib/utlis";
import { DeleteCustomer, UpdateCustomer } from "./buttons";
// import { DeleteCompany, UpdateCompany } from './buttons';
// import { UpdateProduct } from './buttons';

export default async function UsersTable({ data }: { data: any }) {
  console.log(data);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* <div className="md:hidden">
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt="invoice table"
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Company Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Company Size
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((customer: any) => (
                <tr
                  key={customer.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3 flex items-center">
                    <div className="w-20 h-20 mr-5">
                      <Image
                        width={50}
                        height={50}
                        src={
                          customer.profile ? customer.profile : "/user-icon.jpg"
                        }
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* <img src={customer.profile} alt="" /> */}
                    <p>{customer.name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.email}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.company ? customer.company.name : "Unknown"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {customer.company ? customer.company.size : "Unknown"}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(customer.createdAt)}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-start gap-3">
                      <UpdateCustomer id={customer.id} />
                      <DeleteCustomer id={customer.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
