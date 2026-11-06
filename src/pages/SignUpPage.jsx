
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  async function onSubmit(data) {
    try {
      await registerUser(data.username, data.email, data.password);
      navigate('/');
    } catch (error) {
      const serverErrors = error.errors || {};

      Object.entries(serverErrors).forEach(([field, messages]) => {
        setError(field, {
          type: 'server',
          message: Array.isArray(messages) ? messages.join(', ') : String(messages),
        });
      });
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Create account</h1>

        <label>Username</label>
        <input
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'At least 3 characters' },
            maxLength: { value: 20, message: 'Maximum 20 characters' },
          })}
          placeholder="Username"
        />
        {errors.username && <p className="form-error">{errors.username.message}</p>}

        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Enter a valid email',
            },
          })}
          placeholder="Email"
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}

        <label>Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'At least 6 characters' },
            maxLength: { value: 40, message: 'Maximum 40 characters' },
          })}
          placeholder="Password"
        />
        {errors.password && <p className="form-error">{errors.password.message}</p>}

        <label>Repeat password</label>
        <input
          type="password"
          {...register('repeatPassword', {
            required: 'Please repeat your password',
            validate: (value) =>
              value === password || 'Passwords do not match',
          })}
          placeholder="Repeat password"
        />
        {errors.repeatPassword && (
          <p className="form-error">{errors.repeatPassword.message}</p>
        )}

        <label className="checkbox-label">
          <input
            type="checkbox"
            {...register('agree', {
              required: 'You must accept the terms',
            })}
          />
          I agree to the terms and conditions
        </label>
        {errors.agree && <p className="form-error">{errors.agree.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </form>
    </main>
  );
}

export default SignUpPage;
