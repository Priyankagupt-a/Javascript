// VehicleRegistrationForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

// Define the form data type
interface FormData {
  ownerName: string;
  contactNumber: string;
  vehicleModel: string;
  registrationNumber: string;
  vehicleColor: string;
}

const VehicleRegistrationForm: React.FC = () => {
  // Use the useForm hook to manage form data and validation
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // This function will run when the form is submitted
  const onSubmit = (data: FormData) => {
    // Just log the form data to the console (In a real app, you'd send it to a server)
    console.log('Form submitted:', data);
  };

  // Regular expressions for validation
  const contactNumberPattern = /^[0-9]{10}$/;  // 10 digits
  const registrationNumberPattern = /^TS\d{2}[A-Za-z]{2}\d{4}$/;  // TS09EA1234 format

  return (
    <div className="form-container">
      <h2>Vehicle Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Owner Name */}
        <div className="form-group">
          <label htmlFor="ownerName">Owner Name</label>
          <input
            id="ownerName"
            type="text"
            {...register('ownerName', { required: 'Owner Name is required' })}
          />
          {errors.ownerName && <p className="error">{errors.ownerName.message}</p>}
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            id="contactNumber"
            type="text"
            {...register('contactNumber', {
              required: 'Contact Number is required',
              pattern: {
                value: contactNumberPattern,
                message: 'Contact Number must be 10 digits'
              }
            })}
          />
          {errors.contactNumber && <p className="error">{errors.contactNumber.message}</p>}
        </div>

        {/* Vehicle Model */}
        <div className="form-group">
          <label htmlFor="vehicleModel">Vehicle Model</label>
          <input
            id="vehicleModel"
            type="text"
            {...register('vehicleModel', { required: 'Vehicle Model is required' })}
          />
          {errors.vehicleModel && <p className="error">{errors.vehicleModel.message}</p>}
        </div>

        {/* Registration Number */}
        <div className="form-group">
          <label htmlFor="registrationNumber">Registration Number</label>
          <input
            id="registrationNumber"
            type="text"
            {...register('registrationNumber', {
              required: 'Registration Number is required',
              pattern: {
                value: registrationNumberPattern,
                message: 'Registration Number must follow the format TS09EA1234'
              }
            })}
          />
          {errors.registrationNumber && <p className="error">{errors.registrationNumber.message}</p>}
        </div>

        {/* Vehicle Color */}
        <div className="form-group">
          <label htmlFor="vehicleColor">Vehicle Color</label>
          <input
            id="vehicleColor"
            type="text"
            {...register('vehicleColor', { required: 'Vehicle Color is required' })}
          />
          {errors.vehicleColor && <p className="error">{errors.vehicleColor.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default VehicleRegistrationForm;
