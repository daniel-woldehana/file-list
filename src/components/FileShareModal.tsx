import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { FileDTO, FileShareDTO } from '../types/file';
import { fileService } from '../services/api';

interface FileShareModalProps {
  file: FileDTO | null;
  open: boolean;
  onClose: () => void;
}

interface User {
  id: string;
  name: string;
}

// Dummy user data
const dummyUsers: User[] = [
  { id: 'user1', name: 'John Doe' },
  { id: 'user2', name: 'Jane Smith' },
  { id: 'user3', name: 'Mike Johnson' },
  { id: 'user4', name: 'Sarah Wilson' }
];

export const FileShareModal: React.FC<FileShareModalProps> = ({
  file,
  open,
  onClose,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sharingDetails, setSharingDetails] = useState<FileShareDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file && open) {
      loadSharingDetails();
    }
  }, [file, open]);

  const loadSharingDetails = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const details = await fileService.getFileSharingDetails(file.id);
      setSharingDetails(details);
    } catch (error) {
      console.error('Error loading sharing details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!file || !selectedUser) return;

    try {
      await fileService.shareFile(file.id, {
        userId: selectedUser.id,
        userName: selectedUser.name,
        permission: 'READ', // You might want to make this configurable
      });
      loadSharingDetails();
      setSelectedUser(null);
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleRemoveShare = async (shareId: string) => {
    if (!file) return;

    try {
      await fileService.removeShare(file.id, shareId);
      loadSharingDetails();
    } catch (error) {
      console.error('Error removing share:', error);
    }
  };

  if (!file) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share File</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            {file.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Autocomplete
              options={dummyUsers}
              getOptionLabel={(option) => option.name}
              value={selectedUser}
              onChange={(_, newValue) => setSelectedUser(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select User"
                  size="small"
                />
              )}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleShare}
              disabled={!selectedUser}
            >
              Share
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom>
            Shared With
          </Typography>
          {loading ? (
            <Typography>Loading sharing details...</Typography>
          ) : sharingDetails.length > 0 ? (
            <List>
              {sharingDetails.map((share) => (
                <ListItem key={share.id}>
                  <ListItemText
                    primary={share.userName}
                    secondary={`Permission: ${share.permission}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveShare(share.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary">
              No users have access to this file
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}; 