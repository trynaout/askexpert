import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectedExpertState, userState } from '../state/atoms';
import { experts } from '../services/api';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { Send, Psychology } from '@mui/icons-material';

interface Message {
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
}

const Consultation = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const navigate = useNavigate();
  const expert = useRecoilValue(selectedExpertState);
  const user = useRecoilValue(userState);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
    if (user?.role === 'expert') {
      navigate('/experts');
    }
    if (!expert && expertId) {
      experts.getById(expertId).catch(() => {
        setError('Expert not found');
      });
    }
  }, [user, expert, expertId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !expertId) return;

    const newQuestion: Message = {
      type: 'question',
      content: question,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newQuestion]);
    setLoading(true);
    setError('');

    try {
      const response = await experts.getConsultation(expertId, question);
      const newAnswer: Message = {
        type: 'answer',
        content: response.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newAnswer]);
      setQuestion('');
    } catch (err: any) {
      setError('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!expert) {
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
      {/* Expert Info Header */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Psychology sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h6">
              Consultation with {expert.user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {expert.expertise}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Messages Container */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          mb: 3, 
          minHeight: '400px',
          maxHeight: '600px',
          overflow: 'auto'
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'text.secondary',
            }}
          >
            <Psychology sx={{ fontSize: 60, mb: 2 }} />
            <Typography>
              Start your consultation by asking a question
            </Typography>
          </Box>
        ) : (
          messages.map((message, index) => (
            <Card
              key={index}
              sx={{
                mb: 2,
                ml: message.type === 'answer' ? 0 : 'auto',
                mr: message.type === 'question' ? 0 : 'auto',
                width: '80%',
                bgcolor: message.type === 'question' ? 'primary.light' : 'background.paper',
              }}
            >
              <CardContent>
                <Typography
                  color={message.type === 'question' ? 'white' : 'text.primary'}
                >
                  {message.content}
                </Typography>
                <Typography
                  variant="caption"
                  color={message.type === 'question' ? 'white' : 'text.secondary'}
                  sx={{ mt: 1, display: 'block', textAlign: 'right' }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Paper>

      {/* Question Input */}
      <Paper elevation={3} sx={{ p: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Ask your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              multiline
              rows={2}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !question.trim()}
              sx={{ minWidth: '120px' }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  Send
                  <Send sx={{ ml: 1 }} />
                </>
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Consultation; 