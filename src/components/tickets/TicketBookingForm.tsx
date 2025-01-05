//src/components/tickets/TicketBookingForm.tsx

import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TicketTier } from '@/types/event';
import { Card } from '@/components/ui/card';
import {
  CreditCard,
  User,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle
} from 'lucide-react';

interface TicketSelection {
  tierId: string;
  quantity: number;
}

interface AttendeeDetails {
  name: string;
  email: string;
  phone: string;
}

interface BookingFormProps {
  eventId: string;
  selectedTickets: TicketSelection[];
  ticketTiers: TicketTier[];
  agentId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const AttendeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
});

const BookingSchema = Yup.object().shape({
  bookerDetails: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
  }),
  attendees: Yup.array().of(AttendeeSchema),
});

const TicketBookingForm: React.FC<BookingFormProps> = ({
  eventId,
  selectedTickets,
  ticketTiers,
  agentId,
  onSuccess,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');

  const getTotalAmount = () => {
    return selectedTickets.reduce((total, selection) => {
      const tier = ticketTiers.find(t => t.id === selection.tierId);
      return total + (tier?.price || 0) * selection.quantity;
    }, 0);
  };

  const getTotalAttendees = () => {
    return selectedTickets.reduce((total, selection) => total + selection.quantity, 0);
  };

  const initializeAttendees = () => {
    const attendees: AttendeeDetails[] = [];
    selectedTickets.forEach(selection => {
      const tier = ticketTiers.find(t => t.id === selection.tierId);
      for (let i = 0; i < selection.quantity; i++) {
        attendees.push({
          name: '',
          email: '',
          phone: '',
        });
      }
    });
    return attendees;
  };

  const handlePayment = async (formData: any) => {
    try {
      setPaymentStatus('processing');
      // Initialize Razorpay
      const options = {
        key: 'your_razorpay_key',
        amount: getTotalAmount() * 100, // amount in smallest currency unit
        currency: 'INR',
        name: 'Event Booking',
        description: 'Ticket Purchase',
        order_id: '', // Order ID from your backend
        handler: function(response: any) {
          setPaymentStatus('success');
          onSuccess();
        },
        prefill: {
          name: formData.bookerDetails.name,
          email: formData.bookerDetails.email,
          contact: formData.bookerDetails.phone,
        },
        theme: {
          color: '#fa383e'
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Payment failed:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        bookerDetails: {
          name: '',
          email: '',
          phone: '',
        },
        attendees: initializeAttendees(),
      }}
      validationSchema={BookingSchema}
      onSubmit={handlePayment}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Booker Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <Field
                      name="bookerDetails.name"
                      className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                      placeholder="Full Name"
                    />
                    {errors.bookerDetails?.name && touched.bookerDetails?.name && (
                      <div className="text-red-400 text-sm mt-1">{errors.bookerDetails.name}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <Field
                      name="bookerDetails.email"
                      type="email"
                      className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                      placeholder="Email Address"
                    />
                    {errors.bookerDetails?.email && touched.bookerDetails?.email && (
                      <div className="text-red-400 text-sm mt-1">{errors.bookerDetails.email}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Phone</label>
                    <Field
                      name="bookerDetails.phone"
                      className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                      placeholder="Phone Number"
                    />
                    {errors.bookerDetails?.phone && touched.bookerDetails?.phone && (
                      <div className="text-red-400 text-sm mt-1">{errors.bookerDetails.phone}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90 flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Attendee Details</h3>
                <FieldArray name="attendees">
                  {() => (
                    <div className="space-y-6">
                      {values.attendees.map((_, index) => (
                        <Card key={index} className="p-4 bg-white bg-opacity-5">
                          <h4 className="text-white font-medium mb-4">Attendee {index + 1}</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-gray-300 mb-2">Name</label>
                              <Field
                                name={`attendees.${index}.name`}
                                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                placeholder="Full Name"
                              />
                              {errors.attendees?.[index]?.name && touched.attendees?.[index]?.name && (
                                <div className="text-red-400 text-sm mt-1">{errors.attendees[index].name}</div>
                              )}
                            </div>

                            <div>
                              <label className="block text-gray-300 mb-2">Email</label>
                              <Field
                                name={`attendees.${index}.email`}
                                type="email"
                                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                placeholder="Email Address"
                              />
                              {errors.attendees?.[index]?.email && touched.attendees?.[index]?.email && (
                                <div className="text-red-400 text-sm mt-1">{errors.attendees[index].email}</div>
                              )}
                            </div>

                            <div>
                              <label className="block text-gray-300 mb-2">Phone</label>
                              <Field
                                name={`attendees.${index}.phone`}
                                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                placeholder="Phone Number"
                              />
                              {errors.attendees?.[index]?.phone && touched.attendees?.[index]?.phone && (
                                <div className="text-red-400 text-sm mt-1">{errors.attendees[index].phone}</div>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90 flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90 flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                <div className="space-y-4">
                  {selectedTickets.map(selection => {
                    const tier = ticketTiers.find(t => t.id === selection.tierId);
                    return (
                      <div key={selection.tierId} className="flex justify-between items-center">
                        <span className="text-gray-300">
                          {tier?.name} x {selection.quantity}
                        </span>
                        <span className="text-white">${(tier?.price || 0) * selection.quantity}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total Amount</span>
                      <span className="text-white font-bold">${getTotalAmount()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90 flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || paymentStatus === 'processing'}
                  className="px-6 py-2 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90 flex items-center"
                >
                  {paymentStatus === 'processing' ? (
                    'Processing...'
                  ) : (
                    <>
                      Proceed to Payment
                      <CreditCard className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default TicketBookingForm;