import BaseLayout from "@/components/BaseLayout";
//import { products } from "@/dummy_data";
import ProductCheckout from "./ProductCheckout";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCard from "@/components/ProductCard";
import prisma from "@/db/prisma";
import { notFound } from "next/navigation";

/* by default Next gives all server components params as props */

const page = async ({ params }: { params: { id: string } }) => {
  // get current product
  const currentProduct = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      isArchived: false,
      id: { not: params.id },
    },
  });

  // check if a product was not found or has been archived
  if (!currentProduct || currentProduct.isArchived) return notFound();

  return (
    <BaseLayout renderRightPanel={false}>
      <div className="px-3 md:px-7 my-20">
        <ProductCheckout product={currentProduct} />

        <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
          More product from{" "}
          <UnderlinedText className="decoration-wavy underline-offset-8">
            OnlyHorse
          </UnderlinedText>
        </h1>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default page;
