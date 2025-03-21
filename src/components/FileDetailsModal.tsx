import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { FileDTO, LinkedResourceDTO } from '../types/file';
import { fileService } from '../services/api';

interface FileDetailsModalProps {
  file: FileDTO | null;
  open: boolean;
  onClose: () => void;
}

export const FileDetailsModal: React.FC<FileDetailsModalProps> = ({
  file,
  open,
  onClose,
}) => {
  const [linkedResources, setLinkedResources] = useState<LinkedResourceDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file && open) {
      loadFileDetails();
    }
  }, [file, open]);

  const loadFileDetails = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const resources = await fileService.getFileDetails(file);
      setLinkedResources(resources);
    } catch (error) {
      console.error('Error loading file details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!file) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>File Details</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {file.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Category: {file.category}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Size: {Math.round(file.size / 1024)} KB
          </Typography>
          <Typography color="textSecondary">
            Last Modified: {new Date(file.lastModified).toLocaleString()}
          </Typography>
        </Box>

        {file.category !== 'Personnel' && (
          <>
            <Typography variant="h6" gutterBottom>
              Linked Resources
            </Typography>
            {loading ? (
              <Typography>Loading linked resources...</Typography>
            ) : linkedResources.length > 0 ? (
              <List>
                {linkedResources.map((resource) => (
                  <React.Fragment key={resource.id}>
                    <ListItem>
                      <ListItemText
                        primary={resource.name}
                        secondary={`Type: ${resource.type}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography color="textSecondary">
                No linked resources found
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}; 