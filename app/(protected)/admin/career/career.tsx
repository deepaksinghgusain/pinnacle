"use client"
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getApplicationById } from '@/lib/actions/application-action'
import { getEnquiryById } from '@/lib/actions/enquiry-action'
import React, { useEffect, useState } from 'react'

const SingleApplication =  (props: any) => {

    const [application, setApplication] = useState<any>({})

    useEffect(() => {
      getApplicationById(props.id).then((res) => {
        setApplication(res.data);
      })
    }, [props.id])
  

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Application Detail</SheetTitle>
                   
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <h2>Full Name : {application.fullName}</h2>
                    <h2>Email : {application.email}</h2>
                    <h2>Phone : {application.phone}</h2>
                    <h2>Role : {application.role}</h2>
                    <h2>Experience : {application.experience}</h2>
                    <h2>Location : {application.location}</h2>
                    <div>
                        <h2 className="mb-2">Resume Download</h2>
                        {application.resume ? (
                            <a
                                href={"/api" + application.resume}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                                download
                            >
                                Download Resume
                            </a>
                        ) : (
                            <p className="text-sm text-slate-500">No resume uploaded.</p>
                        )}
                    </div>
                    <h2>Message : {application.message}</h2>   
                    <h2>Subject : {application.subject}</h2>    
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

export default SingleApplication