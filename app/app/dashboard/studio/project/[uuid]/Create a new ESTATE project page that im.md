Create a new ESTATE project page that implements the product flow described in:

app/app/(main)/estatelift/components/EstateLiftLandingPage.tsx

The page should present a modern, visually appealing 3-step stepper workflow for generating a real estate video from uploaded photos.

Functional Requirements
Stepper Overview

Implement a 3-step horizontal stepper with clear progress indication:

Upload Photos
Generate & Edit Clips (Optional / Skippable)
Generate Final Video

The stepper must:

Show active step
Allow navigation forward and backward
Allow skipping step 2
Persist state between steps
Be responsive and modern
Step 1 — Upload Photos
Allow multiple image uploads
Show preview thumbnails
Support drag & drop
Allow removing uploaded images
"Next" button becomes enabled when at least one image is uploaded
On click "Next" → navigate to Step 2

Mock behavior:

Simulate upload with timeout
Store images in local state
Step 2 — Generate & Edit Clips (Optional)

This step can be skipped. If skipped, the system should automatically generate default clips from uploaded images.

For each uploaded image:

Simulate AI video generation
Show per-item loading indicator
Display processing states:
queued
generating
completed

When videos are generated allow:

Drag & drop reorder clips
Add optional caption per clip
Trim start/end (simple slider or numeric inputs)
Select optional audio track (mock list)
Select optional animation per clip

Animation options (mock):

None
Fade In
Zoom In
Pan Left
Pan Right
Ken Burns
Slide Up
Slide Down

Buttons:

Back
Skip
Next

All edits should update local state.

Step 3 — Generate Final Video
Show summary of clips
Show selected captions
Show selected animations
Show selected audio
"Generate Final Video" button
On click:
Show global loading indicator
Simulate rendering process
Display success state with mock final video preview
Technical Requirements
Architecture
Use scalable component structure
Separate components per step
Reusable UI components
Clean state management
Suggested Folder Structure
app\app\dashboard\studio\project\[uuid]\components\estate
components/
EstateStepper.tsx
steps/
UploadPhotosStep.tsx
GenerateEditStep.tsx
FinalRenderStep.tsx
video/
VideoCard.tsx
VideoReorderList.tsx
VideoTrimControls.tsx
AudioSelector.tsx
AnimationSelector.tsx
hooks/
useEstateStepper.ts
useMockVideoGeneration.ts
page.tsx
UI Requirements
Modern design
Smooth transitions between steps
Loading skeletons
Progress indicators
Drag-and-drop support
Responsive layout
Clean spacing and typography
State Requirements

Maintain global state:

uploadedImages
generatedVideos
videoOrder
captions
trimValues
selectedAudio
selectedAnimations
finalVideo
step2Skipped
Constraints
Frontend only
Use mock data
No API calls
No backend changes
No database
No authentication logic
Acceptance Criteria
3-step workflow works end-to-end
Step 2 is skippable
Each step isolated in its own component
Mock async loading implemented
Videos reorderable
Captions editable
Trim controls present
Audio selection works
Animation selection works
Final render simulated
Clean scalable architecture
