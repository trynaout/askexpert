import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedExpertState, userState } from '../state/atoms';
import { experts } from '../services/api';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Person,
  Star,
  ExpandMore,
  QuestionAnswer,
  Psychology,
} from '@mui/icons-material';

const ExpertProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [expert, setExpert] = useRecoilState(selectedExpertState);
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        if (!id) return;
        const data = await experts.getById(id);
        setExpert(data);
      } catch (err: any) {
        setError('Failed to load expert profile');
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id, setExpert]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !expert) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error || 'Expert not found'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Expert Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Person sx={{ fontSize: 60, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h4" component="h1">
              {expert.user.name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {expert.expertise}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Star sx={{ color: 'primary.main', mr: 1 }} />
          <Rating value={expert.rating} readOnly precision={0.5} />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({expert.consultationCount} consultations)
          </Typography>
        </Box>

        <Chip
          label={`${expert.experienceYears} years experience`}
          color="primary"
          variant="outlined"
          sx={{ mr: 1 }}
        />
      </Paper>

      {/* Expert Description */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {expert.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Common Q&As */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        <QuestionAnswer sx={{ mr: 1, verticalAlign: 'middle' }} />
        Common Questions & Answers
      </Typography>

      {expert.commonQuestions.map((qa, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">{qa.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" color="text.secondary">
              {qa.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Consultation Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        {user && user.role === 'user' ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Psychology />}
            onClick={() => navigate(`/consultation/${expert.id}`)}
          >
            Start Consultation
          </Button>
        ) : user?.role === 'expert' ? (
          <Alert severity="info">
            Experts cannot start consultations with other experts.
          </Alert>
        ) : (
          <Alert severity="info">
            Please{' '}
            <Button
              color="primary"
              size="small"
              onClick={() => navigate('/signin')}
            >
              sign in
            </Button>{' '}
            to start a consultation.
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default ExpertProfile; 