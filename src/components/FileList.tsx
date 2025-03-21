import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Box,
  Typography,
  Checkbox,
  Pagination,
  Select,
  MenuItem,
  InputAdornment,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Flag as FlagIcon,
  Visibility as VisibilityIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { FileDTO, FileFilter } from '../types/file';
import { fileService } from '../services/api';
import { ShareFileModal } from './ShareFileModal';

interface FileListProps {
  onFileSelect: (file: FileDTO) => void;
  onShareClick: (file: FileDTO) => void;
  onPreviewClick: (file: FileDTO) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return '#4CAF50';
    case 'archived':
      return '#FFA000';
    case 'deleted':
      return '#F44336';
    default:
      return '#757575';
  }
};

const getFlagColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'ordering':
      return '#FF4081';
    case 'production':
      return '#FFA000';
    case 'bookkeeping':
      return '#4CAF50';
    case 'personnel':
      return '#2196F3';
    case 'administration':
      return '#9C27B0';
    default:
      return '#757575';
  }
};

export const FileList: React.FC<FileListProps> = ({
  onFileSelect,
  onShareClick,
  onPreviewClick,
}) => {
  const [files, setFiles] = useState<FileDTO[]>([]);
  const [filter, setFilter] = useState<FileFilter>({
    search: '',
    category: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedActionFile, setSelectedActionFile] = useState<FileDTO | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await fileService.getFiles();
      setFiles(data);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedFiles(files.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const filteredFiles = files
    .filter((file) => {
      const matchesSearch = file.name.toLowerCase().includes(filter.search?.toLowerCase() || '');
      const matchesCategory = !filter.category || file.category === filter.category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const order = filter.sortOrder === 'asc' ? 1 : -1;
      switch (filter.sortBy) {
        case 'name':
          return order * a.name.localeCompare(b.name);
        case 'size':
          return order * (a.size - b.size);
        case 'lastModified':
          return order * (new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime());
        default:
          return 0;
      }
    });

  const paginatedFiles = filteredFiles.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, file: FileDTO) => {
    setAnchorEl(event.currentTarget);
    setSelectedActionFile(file);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setSelectedActionFile(null);
  };

  const handleMenuItemClick = (action: string) => {
    if (!selectedActionFile) return;
    
    switch (action) {
      case 'view':
        onFileSelect(selectedActionFile);
        handleActionClose();
        break;
      case 'preview':
        onPreviewClick(selectedActionFile);
        handleActionClose();
        break;
      case 'share':
        setIsShareModalOpen(true);
        setAnchorEl(null);
        break;
      case 'download':
        fileService.downloadFile(selectedActionFile.uuid);
        handleActionClose();
        break;
    }
  };

  const handleShareModalClose = () => {
    setIsShareModalOpen(false);
    setSelectedActionFile(null);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Box sx={{ width: '100%', p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h1">
            File List
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search"
              size="small"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton>
              <Typography sx={{ mr: 1 }}>Filter</Typography>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedFiles.length === files.length}
                    indeterminate={selectedFiles.length > 0 && selectedFiles.length < files.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>File Name</TableCell>
                <TableCell>Category/Department</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Flags</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedFiles.map((file) => (
                <TableRow 
                  key={file.id}
                  sx={{ 
                    backgroundColor: selectedFiles.includes(file.id) ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">{file.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        ({file.type}, {formatFileSize(file.size)})
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="primary" sx={{ color: getFlagColor(file.category) }}>
                      {file.category}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2">
                        {new Date(file.lastModified).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        (Alice Brown)
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2">
                        {new Date(file.lastModified).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        (David Smith)
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: getStatusColor(file.customTag?.status || 'active'),
                        fontWeight: 500,
                      }}
                    >
                      {file.customTag?.status || 'Active'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <FlagIcon sx={{ color: getFlagColor(file.category) }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleActionClick(e, file)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleActionClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick('view')}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('preview')}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Preview</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('share')}>
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('download')}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Download</ListItemText>
          </MenuItem>
        </Menu>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">Rows per page:</Typography>
            <Select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              size="small"
            >
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </Box>
          <Pagination
            count={Math.ceil(filteredFiles.length / rowsPerPage)}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            shape="rounded"
          />
        </Box>
      </Box>

      {selectedActionFile && (
        <ShareFileModal
          file={selectedActionFile}
          open={isShareModalOpen}
          onClose={handleShareModalClose}
        />
      )}
    </>
  );
}; 