import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { FileDTO } from '../types/file';

interface FileDetailsModalProps {
  file: FileDTO | null;  // Allow null
  open: boolean;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <Box sx={{ display: 'flex', py: 1 }}>
    <Typography sx={{ color: '#666666', width: '180px' }}>{label}</Typography>
    <Typography sx={{ flex: 1, color: '#333333' }}>{value}</Typography>
  </Box>
);

const UserInfo: React.FC<{ user: { name: string; avatar?: string } }> = ({ user }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Avatar
      src={user.avatar}
      sx={{ width: 24, height: 24 }}
    >
      {user.name.charAt(0)}
    </Avatar>
    <Typography sx={{ color: '#333333' }}>{user.name}</Typography>
  </Box>
);

export const FileDetailsModal: React.FC<FileDetailsModalProps> = ({
  file,
  open,
  onClose,
}) => {
  if (!file) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          maxWidth: '600px',
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #E0E0E0'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>File Details</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: '#333333', mb: 2 }}>
            {file.name}
          </Typography>

          <Box sx={{ bgcolor: '#F8F9FA', borderRadius: 1, p: 3, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#333333', mb: 2, fontWeight: 500 }}>
              Main File Details
            </Typography>

            <DetailRow label="Uploaded by" value={<UserInfo user={{ name: file.createdBy.name, avatar: file.createdBy.avatar }} />} />
            <DetailRow label="Uploaded Date" value={file.createdAt} />
            <DetailRow label="Last Modified by" value={<UserInfo user={{ name: file.modifiedBy.name, avatar: file.modifiedBy.avatar }} />} />
            <DetailRow label="Last Modified" value={file.modifiedAt} />
            <DetailRow label="Type" value={file.type} />
            <DetailRow label="Format" value={file.format} />
            <DetailRow label="Size" value={formatFileSize(file.size)} />
            <DetailRow label="Access Level" value={file.accessLevel.join(', ')} />
          </Box>

          {file.linkedResources && (
            <Box sx={{ bgcolor: '#F8F9FA', borderRadius: 1, p: 3 }}>
              <Typography variant="subtitle1" sx={{ color: '#333333', mb: 2, fontWeight: 500 }}>
                Linked Resources
              </Typography>

              <DetailRow 
                label="Order ID" 
                value={
                  <Typography 
                    component="a" 
                    href={`/orders/${file.linkedResources.orderId}`}
                    sx={{ color: '#1976d2', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    #{file.linkedResources.orderId}
                  </Typography>
                } 
              />
              <DetailRow label="Order Date" value={file.linkedResources.orderDate} />
              <DetailRow label="Supplier/Customer Name" value={file.linkedResources.customerName} />
              <DetailRow label="Delivery Date" value={file.linkedResources.deliveryDate} />
              <DetailRow 
                label="Related Resource" 
                value={
                  <Typography 
                    component="a" 
                    href={file.linkedResources.relatedResourceUrl}
                    sx={{ color: '#1976d2', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    {file.linkedResources.relatedResourceName}
                  </Typography>
                } 
              />
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}; 