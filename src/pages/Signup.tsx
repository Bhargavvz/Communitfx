import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Signup() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
    // const form = e.target as HTMLFormElement;
    // const formData = new FormData(form);

    // // Using type assertions to ensure values are strings
    // const name = formData.get("fullName") as string;
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    // const confirmPassword = formData.get("confirmPassword") as string;
    // console.log('name=', name, 'pass:', password, 'email:', email);
    // // Check for null values before making the request
    // if (!name || !email || !password || !(password === confirmPassword)) {
    //   alert("Please fill out all fields.");
    //   return;
    // }
    console.log('Form Submitted!');
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    alert('pause');
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: 'name',
          email: 'email',
          password: 'rahul',
        }),
      });

      if (response.ok) {
        alert("Sign-up successful");
        window.location.href = 'index';
      } else {
        alert("Sign-up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Sign-up failed");
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join our community to start reporting issues"
    >
      <form className="mt-8 space-y-6" onSubmit={()=>handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Full name"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          <Input
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Input
            label="Confirm password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </div>

        <Button
          type="submit"
          fullWidth
          icon={UserPlus}
        >
          Create account
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}