import React from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import { colors } from '../../../assets/colors';

interface FormField {
  label: string;
  name: string;
  type: string;
}

interface FormProps {
  title: string;
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => void;
  submitButtonText: string;
  additionalButton?: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ title, fields, onSubmit, submitButtonText, additionalButton }) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObject: Record<string, string> = {};

    fields.forEach((field) => {
      formDataObject[field.name] = formData.get(field.name) as string;
    });

    onSubmit(formDataObject);
  };
  return (
    <Container sx={{ padding: '40px', textAlign: 'left' }}>
      <Typography variant="h4" color="blanco" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField fullWidth variant="outlined" color="primary" required {...field} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" style={{ backgroundColor: colors.verdeEsperanza, color: '#FFFFFF' }} fullWidth>
              {submitButtonText}
            </Button>
          </Grid>
          {additionalButton && (
            <Grid item xs={12}>
              {additionalButton}
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  )
}

export default Form