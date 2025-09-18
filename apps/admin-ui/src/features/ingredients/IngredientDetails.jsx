import { useState } from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from '@mui/material';

// import { updateIngredient, deleteIngredient } from '../../api/ingredientApi'; // Import API functions

function IngredientDetails({
  ingredient,
  onIngredientUpdated,
  onIngredientDeleted,
  onCloseDrawer,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(ingredient.name);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(ingredient.name);
    setError(null);
  };

  const handleSaveEdit = async () => {
    if (!editedName.trim()) {
      setError('Ingredient name cannot be empty.');
      return;
    }
    if (editedName.trim() === ingredient.name) {
      setIsEditing(false);
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const updated = null; // await updateIngredient(ingredient._id, editedName.trim());
      onIngredientUpdated(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update ingredient:', err);
      setError(err.response?.data?.message || 'Failed to update ingredient.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      // await deleteIngredient(ingredient._id);
      onIngredientDeleted(ingredient._id);
      handleCloseDeleteDialog();
      if (onCloseDrawer) {
        onCloseDrawer();
      }
    } catch (err) {
      console.error('Failed to delete ingredient:', err);
      setError(err.response?.data?.message || 'Failed to delete ingredient.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Ingredient Details
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {isEditing ? (
            <>
              <TextField
                label="Ingredient Name"
                variant="outlined"
                fullWidth
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !saving) handleSaveEdit();
                }}
                disabled={saving}
                error={!!error}
                helperText={error}
                autoFocus
              />
              <Button
                variant="contained"
                onClick={handleSaveEdit}
                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                disabled={saving}
                size="small"
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancelEdit}
                startIcon={<CancelIcon />}
                disabled={saving}
                size="small"
                color="secondary"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Box>
                <Typography variant="h6" sx={{ mr: 1 }}>
                  {ingredient.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                  ID: {ingredient.id}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton color="info" onClick={handleEditClick} aria-label="edit ingredient">
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={handleDeleteClick}
                  aria-label="delete ingredient"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{ingredient.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary" disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            autoFocus
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={20} /> : null}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default IngredientDetails;
