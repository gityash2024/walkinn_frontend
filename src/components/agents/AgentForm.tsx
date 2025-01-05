// src/components/agents/AgentForm.tsx

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Agent, AgentFormData } from '@/types';
import { Card } from '@/components/ui/card';
import { X, Upload } from 'lucide-react';

const AgentSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.object().shape({
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    zipCode: Yup.string().required('Required'),
  }),
});

interface AgentFormProps {
  initialValues?: Partial<Agent>;
  onSubmit: (values: AgentFormData) => void;
  onCancel: () => void;
}

const AgentForm: React.FC<AgentFormProps> = ({
  initialValues,
  onSubmit,
  onCancel
}) => {
  const defaultValues: AgentFormData = {
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    address: initialValues?.address || {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    documents: []
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={AgentSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <Field
                name="name"
                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                placeholder="Enter agent name"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                placeholder="Enter email address"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone
              </label>
              <Field
                name="phone"
                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                placeholder="Enter phone number"
              />
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-white mb-4">Address Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Street Address
                </label>
                <Field
                  name="address.street"
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter street address"
                />
                {errors.address?.street && touched.address?.street && (
                  <div className="text-red-500 text-sm mt-1">{errors.address.street}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  City
                </label>
                <Field
                  name="address.city"
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter city"
                />
                {errors.address?.city && touched.address?.city && (
                  <div className="text-red-500 text-sm mt-1">{errors.address.city}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  State
                </label>
                <Field
                  name="address.state"
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter state"
                />
                {errors.address?.state && touched.address?.state && (
                  <div className="text-red-500 text-sm mt-1">{errors.address.state}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Country
                </label>
                <Field
                  name="address.country"
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter country"
                />
                {errors.address?.country && touched.address?.country && (
                  <div className="text-red-500 text-sm mt-1">{errors.address.country}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  ZIP Code
                </label>
                <Field
                  name="address.zipCode"
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter ZIP code"
                />
                {errors.address?.zipCode && touched.address?.zipCode && (
                  <div className="text-red-500 text-sm mt-1">{errors.address.zipCode}</div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-white mb-4">Documents</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-300 mb-2">
                    Drag and drop your documents here, or click to select files
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      // Handle file upload
                    }}
                    multiple
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-white bg-opacity-10 rounded-lg text-white text-sm hover:bg-opacity-20"
                    onClick={() => {
                      // Trigger file input
                    }}
                  >
                    Select Files
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-opacity-90"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90"
            >
              {initialValues ? 'Update Agent' : 'Add Agent'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AgentForm;