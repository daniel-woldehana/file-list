import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { FileDTO } from '../types/file';

interface ShareFileModalProps {
  file: FileDTO;
  open: boolean;
  onClose: () => void;
}

export const ShareFileModal: React.FC<ShareFileModalProps> = ({
  file,
  open,
  onClose,
}) => {
  const [shareType, setShareType] = useState<'public' | 'login'>('public');
  const [shareLink, setShareLink] = useState(`https://example.com/share/${file?.name?.toLowerCase().replace(/\s+/g, '-')}`);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          maxWidth: '480px',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid #E0E0E0'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>Share File</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
        <Box sx={{ width: '100%', mt: 1 }}>
          <TextField
            fullWidth
            value={shareLink}
            onChange={(e) => setShareLink(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleCopyLink}
                    sx={{ 
                      color: copied ? '#4CAF50' : '#1976d2',
                    }}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: '#F5F5F5',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2'
                }
              }
            }}
            sx={{ mb: 3 }}
          />

          <RadioGroup
            value={shareType}
            onChange={(e) => setShareType(e.target.value as 'public' | 'login')}
            row
            sx={{ gap: 4 }}
          >
            <FormControlLabel 
              value="public" 
              control={
                <Radio 
                  sx={{
                    '&.Mui-checked': {
                      color: '#1976d2',
                    }
                  }}
                />
              } 
              label={
                <Typography sx={{ fontWeight: shareType === 'public' ? 500 : 400 }}>
                  Public
                </Typography>
              }
            />
            <FormControlLabel 
              value="login" 
              control={
                <Radio 
                  sx={{
                    '&.Mui-checked': {
                      color: '#1976d2',
                    }
                  }}
                />
              } 
              label={
                <Typography sx={{ fontWeight: shareType === 'login' ? 500 : 400 }}>
                  Required Login
                </Typography>
              }
            />
          </RadioGroup>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        p: 2, 
        gap: 1,
        borderTop: '1px solid #E0E0E0'
      }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#666',
            borderColor: '#ddd',
            '&:hover': {
              borderColor: '#bbb',
              backgroundColor: '#f5f5f5',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleCopyLink}
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            }
          }}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 