"use client"
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getEnquiryById } from '@/lib/actions/enquiry-action'
import React, { useEffect, useState } from 'react'

const SingleEnquiry =  (props: any) => {

    const [enquiry, setEnquiry] = useState<any>({})

    useEffect(() => {
      getEnquiryById(props.id).then((res) => {
        setEnquiry(res.data);
      })
    }, [props.id])
  

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Enquiry Detail</SheetTitle>
                   
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <h2>Full Name : {enquiry.fullName}</h2>
                    <h2>Email : {enquiry.email}</h2>
                    <h2>Phone : {enquiry.phoneNumber}</h2>
                    <h2>Company Name : {enquiry.companyName}</h2>
                    <h2>Message : {enquiry.message}</h2>   
                    <h2>Subject : {enquiry.subject}</h2>    
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default SingleEnquiry