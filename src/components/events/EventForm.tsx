// src/components/events/EventForm.tsx
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { EventFormData, EventType, EventCategory } from '@/types/event';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Tag, Plus, Minus, Upload, Save, X, Globe } from 'lucide-react';

interface EventFormProps {
  initialValues: Partial<EventFormData>;
  onSubmit: (values: EventFormData) => void;
  onCancel: () => void;
}

const eventCategories: EventCategory[] = ['music', 'sports', 'arts', 'technology', 'food', 'business', 'education', 'other'];
const eventTypes: EventType[] = ['online', 'offline', 'hybrid'];

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  shortDescription: Yup.string().required('Short description is required').max(150, 'Maximum 150 characters'),
  category: Yup.string().required('Category is required'),
  type: Yup.string().required('Event type is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string()
    .required('End date is required')
    .test('is-after-start', 'End date must be after start date', function(value) {
      const { startDate } = this.parent;
      return !startDate || !value || new Date(value) > new Date(startDate);
    }),
  registrationStartDate: Yup.string().required('Registration start date is required'),
  registrationEndDate: Yup.string()
    .required('Registration end date is required')
    .test('is-before-event', 'Registration must end before event starts', function(value) {
      const { startDate } = this.parent;
      return !startDate || !value || new Date(startDate) > new Date(value);
    }),
  venue: Yup.object().when('type', {
    is: (type: string) => type === 'offline' || type === 'hybrid',
    then: () => Yup.object().shape({
      name: Yup.string().required('Venue name is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      country: Yup.string().required('Country is required'),
      capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be greater than 0'),
    }),
    otherwise: () => Yup.object().shape({
      platform: Yup.string().required('Platform is required'),
      link: Yup.string().required('Meeting link is required').url('Must be a valid URL'),
      capacity: Yup.number().required('Capacity is required').min(1, 'Capacity must be greater than 0'),
    }),
  }),
  ticketTiers: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Tier name is required'),
      price: Yup.number().required('Price is required').min(0, 'Price must be non-negative'),
      quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be greater than 0'),
      maxPerBooking: Yup.number()
        .required('Max per booking is required')
        .min(1, 'Must allow at least 1 ticket per booking')
        .test('max-booking-check', 'Cannot exceed quantity', function(value) {
          return !value || value <= this.parent.quantity;
        }),
    })
  ),
  minTickets: Yup.number().required('Minimum tickets is required').min(1, 'Must be at least 1'),
  maxTickets: Yup.number()
    .required('Maximum tickets is required')
    .min(1, 'Must be at least 1')
    .test('min-max-check', 'Must be greater than minimum tickets', function(value) {
      const { minTickets } = this.parent;
      return !minTickets || !value || value >= minTickets;
    }),
});

const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Card className="bg-gray-900 backdrop-blur-lg p-8">
      <Formik
        initialValues={{
          title: '',
          description: '',
          shortDescription: '',
          category: '',
          type: 'offline' as EventType,
          status: 'draft',
          startDate: '',
          endDate: '',
          registrationStartDate: '',
          registrationEndDate: '',
          thumbnail: '',
          images: [],
          venue: {
            name: '',
            address: '',
            city: '',
            state: '',
            country: '',
            capacity: 0,
            amenities: [],
            platform: '',
            link: '',
          },
          ticketTiers: [{
            name: 'General Admission',
            description: '',
            price: 0,
            quantity: 0,
            maxPerBooking: 0,
            type: 'single' as const,
          }],
          minTickets: 1,
          maxTickets: 1,
          totalTickets: 0,
          price: { min: 0, max: 0 },
          tags: [],
          isFeatured: false,
          isPublished: false,
          ...initialValues
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Event Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Field
                        name="title"
                        className="w-full px-4 h-12 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                        placeholder="Event Title"
                      />
                      {errors.title && touched.title && (
                        <div className="text-red-400 text-sm mt-1">{errors.title}</div>
                      )}
                    </div>

                    <div>
                      <Field
                        name="shortDescription"
                        as="textarea"
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white h-20"
                        placeholder="Short description (max 150 characters)"
                      />
                      {errors.shortDescription && touched.shortDescription && (
                        <div className="text-red-400 text-sm mt-1">{errors.shortDescription}</div>
                      )}
                    </div>

                    <div>
                      <Field
                        name="description"
                        as="textarea"
                        className="w-full px-4 py-3 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white h-32"
                        placeholder="Full event description"
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-400 text-sm mt-1">{errors.description}</div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Field
                          as="select"
                          name="category"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                        >
                          <option value="">Select Category</option>
                          {eventCategories.map(category => (
                            <option key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div>
                        <Field
                          as="select"
                          name="type"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                        >
                          {eventTypes.map(type => (
                            <option key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Event Schedule</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="datetime-local"
                        name="startDate"
                        className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <Field
                        type="datetime-local"
                        name="endDate"
                        className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <Field
                        type="datetime-local"
                        name="registrationStartDate"
                        className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                      />
                    </div>

                    <div>
                      <Field
                        type="datetime-local"
                        name="registrationEndDate"
                        className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {values.type === 'online' ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Online Event Details</h2>
                    <div className="space-y-4">
                      <div>
                        <Field
                          as="select"
                          name="venue.platform"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                        >
                          <option value="">Select Platform</option>
                          <option value="zoom">Zoom</option>
                          <option value="google-meet">Google Meet</option>
                          <option value="microsoft-teams">Microsoft Teams</option>
                          <option value="other">Other</option>
                        </Field>
                      </div>

                      <div>
                        <Field
                          name="venue.link"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                          placeholder="Meeting Link"
                        />
                      </div>

                      <div>
                        <Field
                          type="number"
                          name="venue.capacity"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                          placeholder="Participant Capacity"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Venue Details</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Field
                            name="venue.name"
                            className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                            placeholder="Venue Name"
                          />
                        </div>

                        <div>
                          <Field
                            type="number"
                            name="venue.capacity"
                            className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                            placeholder="Venue Capacity"
                          />
                        </div>
                      </div>

                      <div>
                        <Field
                          name="venue.address"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                          placeholder="Street Address"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Field
                            name="venue.city"
                            className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                            placeholder="City"
                          />
                        </div>

                        <div>
                          <Field
                            name="venue.state"
                            className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                            placeholder="State"
                          />
                        </div>

                        <div>
                          <Field
                            name="venue.country"
                            className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                            placeholder="Country"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Ticket Configuration</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Field
                          type="number"
                          name="minTickets"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                          placeholder="Min Tickets per Booking"
                        />
                      </div>

                      <div>
                        <Field
                          type="number"
                          name="maxTickets"
                          className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                          placeholder="Max Tickets per Booking"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Ticket Tiers</h3>
                        <button
                          type="button"
                          onClick={() => {
                            const newTier = {
                              name: '',
                              description: '',
                              price: 0,
                              quantity: 0,
                              maxPerBooking: 0,
                              type: 'single' as const,
                            };
                            setFieldValue('ticketTiers', [...values.ticketTiers, newTier]);
                          }}
                          className="flex items-center px-4 py-2 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Tier
                        </button>
                      </div>

                      <FieldArray name="ticketTiers">
                        {({ remove }) => (
                          <div className="space-y-4">
                            {values.ticketTiers.map((tier, index) => (
                              <div key={index} className="p-4 bg-white bg-opacity-5 rounded-lg relative">
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                                >
                                  <X className="w-4 h-4" />
                                </button>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Field
                                      name={`ticketTiers.${index}.name`}
                                      className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                      placeholder="Tier Name"
                                    />
                                  </div>

                                  <div>
                                    <Field
                                      as="select"
                                      name={`ticketTiers.${index}.type`}
                                      className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                    >
                                      <option value="single">Single</option>
                                      <option value="couple">Couple</option>
                                      <option value="multi">Multi</option>
                                    </Field>
                                  </div>

                                  <div>
                                    <Field
                                      type="number"
                                      name={`ticketTiers.${index}.price`}
                                      className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                      placeholder="Price"
                                    />
                                  </div>

                                  <div>
                                    <Field
                                      type="number"
                                      name={`ticketTiers.${index}.quantity`}
                                      className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                      placeholder="Available Quantity"
                                    />
                                  </div>

                                  <div>
                                    <Field
                                      type="number"
                                      name={`ticketTiers.${index}.maxPerBooking`}
                                      className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                      placeholder="Max Per Booking"
                                    />
                                  </div>

                                  <div>
                                    <Field
                                      name={`ticketTiers.${index}.description`}
                                      className="w-full h-12 px-4 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                                      placeholder="Description"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-800">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-opacity-90 h-12"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90 flex items-center h-12"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Event
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default EventForm;