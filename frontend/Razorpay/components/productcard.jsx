import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export default function ProductCard() {
    const [amountPlan1, setAmountPlan1] = useState(299);
    const [amountPlan2, setAmountPlan2] = useState(399);
    const [amountPlan3, setAmountPlan3] = useState(299);

    // handlePayment Function
    const handlePayment = async (amount) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount
                })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data);
        } catch (error) {
            console.log(error);
            toast.error('Payment initiation failed!');
        }
    };

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Himanshi",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response);
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    });

                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message);
                    }
                } catch (error) {
                    console.log(error);
                    toast.error('Payment verification failed!');
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    return (
        <>
            {/* First Card */}
            <Card className="mt-6 w-96 bg-[#222f3e] text-white mr-6">
                {/* CardHeader */}
                <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
                    {/* Image  */}
                    <img
                        src="https://th.bing.com/th?id=OIP.6sdyUL65Uzka0G2cq_CmlwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                        alt="card-image"
                    />
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    {/* Typography For Title */}
                    <Typography variant="h5" className="mb-2">
                        Plan 1 
                    </Typography>

                    {/* Typography For Price  */}
                    <Typography>
                       299 <span className=" line-through">₹399</span>
                    </Typography>
                    <Typography>
                      <ul>
                       <li>
                        1.feature1
                       </li>
                       <li>
                        2.Feature2
                       </li>
                      </ul>
                    </Typography>
                </CardBody>

                {/* CardFooter  */}
                <CardFooter className="pt-0">
                    {/* Buy Now Button  */}
                    <Button onClick={() => handlePayment(amountPlan1)} className="w-full bg-[#1B9CFC]">Buy Now</Button>
                    <Toaster />
                </CardFooter>
            </Card>

            {/* Second Card */}
            <Card className="mt-6 w-96 bg-[#222f3e] text-white mr-6">
                {/* CardHeader */}
                <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
                    {/* Image  */}
                    <img
                        src="https://th.bing.com/th?id=OIP.6sdyUL65Uzka0G2cq_CmlwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                        alt="card-image"
                    />
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    {/* Typography For Title */}
                    <Typography variant="h5" className="mb-2">
                       Plan 2
                    </Typography>

                    {/* Typography For Price  */}
                    <Typography>
                        399 <span className=" line-through">₹499</span>
                    </Typography>
                    <Typography>
                      <ul>
                       <li>
                        1.feature1
                       </li>
                       <li>
                        2.Feature2
                       </li>
                      </ul>
                    </Typography>
                </CardBody>

                {/* CardFooter  */}
                <CardFooter className="pt-0">
                    {/* Buy Now Button  */}
                    <Button onClick={() => handlePayment(amountPlan2)} className="w-full bg-[#1B9CFC]">Buy Now</Button>
                    <Toaster />
                </CardFooter>
            </Card>

            {/* Third Card */}
            <Card className="mt-6 w-96 bg-[#222f3e] text-white">
                {/* CardHeader */}
                <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
                    {/* Image  */}
                    <img
                        src="https://th.bing.com/th?id=OIP.6sdyUL65Uzka0G2cq_CmlwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                        alt="card-image"
                    />
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    {/* Typography For Title */}
                    <Typography variant="h5" className="mb-2">
                        Plan 3
                        
                    </Typography>

                    {/* Typography For Price  */}
                    <Typography>
                        599 <span className=" line-through">₹699</span>
                    </Typography>
                    <Typography>
                      <ul>
                       <li>
                        1.feature1
                       </li>
                       <li>
                        2.Feature2
                       </li>
                      </ul>
                    </Typography>
                </CardBody>

                {/* CardFooter  */}
                <CardFooter className="pt-0">
                    {/* Buy Now Button  */}
                    <Button onClick={() => handlePayment(amountPlan3)} className="w-full bg-[#1B9CFC]">Buy Now</Button>
                    <Toaster />
                </CardFooter>
            </Card>
        </>
    );
}
