


// import { redirect } from "next/navigation";
// import { getSession } from "@/actions/auth";
// import { CheckoutForm } from "./components/checkout-form";

// const PLANS = {
//   daily: { name: "24 Hours", price: 1500, duration: 1 },
//   weekly: { name: "Weekly", price: 5000, duration: 7 },
//   monthly: { name: "Monthly", price: 15000, duration: 30 },
//   quarterly: { name: "3 Months", price: 40000, duration: 90 },
//   semiannual: { name: "6 Months", price: 75000, duration: 180 },
//   annual: { name: "Annual", price: 130000, duration: 365 },
// };

// export default async function CheckoutPage({
//   searchParams,
// }: {
//   searchParams?: { plan?: string };
// }) {
//   const session = await getSession();

//   const planId = searchParams?.plan ?? "monthly";

//   if (!session?.user) {
//     redirect(`/login?redirect=/checkout&plan=${planId}`);
//   }

//   const plan = PLANS[planId as keyof typeof PLANS];

//   if (!plan) {
//     redirect("/pricing");
//   }

//   return (
//     <div className="min-h-screen bg-background pt-24 pb-12">
//       <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">
//             Complete Your Subscription
//           </h1>
//           <p className="text-muted-foreground">
//             You're subscribing to the {plan.name} plan
//           </p>
//         </div>

//         <CheckoutForm
//           plan={{
//             id: planId,
//             name: plan.name,
//             price: plan.price,
//             duration: plan.duration,
//           }}
//           user={{
//             id: session.user.id,
//             name: session.user.name,
//             email: session.user.email,
//             phone: session.user.phone,
//           }}
//         />
//       </div>
//     </div>
//   );
// }



import { redirect } from "next/navigation";
import { getSession } from "@/actions/auth";
import { CheckoutForm } from "./components/checkout-form";

const PLANS = {
  daily: { name: "24 Hours", price: 1500, duration: 1 },
  weekly: { name: "Weekly", price: 5000, duration: 7 },
  monthly: { name: "Monthly", price: 15000, duration: 30 },
  quarterly: { name: "3 Months", price: 40000, duration: 90 },
  semiannual: { name: "6 Months", price: 75000, duration: 180 },
  annual: { name: "Annual", price: 130000, duration: 365 },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const session = await getSession();
  
  // ✅ Await searchParams
  const params = await searchParams;
  const planId = params?.plan ?? "monthly";

  if (!session?.user) {
    redirect(`/login?redirect=/checkout&plan=${planId}`);
  }

  const plan = PLANS[planId as keyof typeof PLANS];

  if (!plan) {
    redirect("/pricing");
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Complete Your Subscription
          </h1>
          <p className="text-muted-foreground">
            You're subscribing to the {plan.name} plan
          </p>
        </div>

        <CheckoutForm
          plan={{
            id: planId,
            name: plan.name,
            price: plan.price,
            duration: plan.duration,
          }}
          user={{
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            phone: session.user.phone,
          }}
        />
      </div>
    </div>
  );
}