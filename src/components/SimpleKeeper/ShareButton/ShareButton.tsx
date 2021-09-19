import React, { memo, useCallback, useState } from 'react'
import { Alert, IconButton, Snackbar } from '@mui/material'
import { ContentCopyRounded, ShareRounded } from '@mui/icons-material'

interface ShareButtonProps {
  onClick?: () => void
}

export default memo(function ShareButton({ onClick = () => {} }: ShareButtonProps) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const canShare = !!navigator.share
  const icon = canShare ? <ShareRounded /> : <ContentCopyRounded />

  const handleSnackbarClose = useCallback(() => setIsSnackbarOpen(false), [])
  const handleCopyURL = useCallback(() => navigator.clipboard.writeText(window.location.href), [])
  const handleShareURL = useCallback(() => navigator.share({ url: window.location.href }), [])
  const handleClick = useCallback(() => {
    if (canShare) {
      handleCopyURL()
      handleShareURL()
    } else {
      handleCopyURL()
      setIsSnackbarOpen(true)
    }
  }, [canShare, handleCopyURL, handleShareURL])

  return (
    <>
      <IconButton color='inherit' onClick={handleClick} sx={{ ml: { xs: 0, sm: 0.5 } }} title='Share'>
        {icon}
      </IconButton>
      <Snackbar open={isSnackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={'success'}>
          Game URL copied!
        </Alert>
      </Snackbar>
    </>
  )
})
