# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a ROV (Remotely Operated Vehicle) marina simulation game built with React, Three.js, and React Three Fiber. The player controls an underwater ROV to explore the ocean floor and discover marine creatures in a first-person perspective underwater environment.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Core Technology Stack
- **React 19.1.1** - UI framework
- **React Three Fiber 9.3.0** - React bindings for Three.js
- **React Three Drei 10.6.1** - Helper components for R3F
- **Three.js 0.179.1** - 3D graphics library
- **Vite** - Build tool and development server

### Project Structure

```
src/
├── scenes/           # Main 3D scenes
│   └── OceanScene.jsx    # Primary underwater scene
├── components/       # Reusable 3D and UI components
│   ├── ROVVehicle.jsx    # Main ROV with realistic vehicle physics
│   ├── ROV.jsx           # Simplified ROV (legacy)
│   ├── MarineCreature.jsx # Interactive marine life
│   ├── OceanFloor.jsx    # Seafloor with decorations
│   ├── VehicleCamera.jsx # First-person camera system
│   └── ROVCameraUI.jsx   # HUD overlay
├── hooks/            # Custom React hooks
│   └── useKeyboardControls.js # WASD + Space/Shift controls
└── assets/           # 3D models and textures
    ├── models/       # GLTF marine creature models
    └── textures/     # Seafloor textures
```

### Key Components

**ROVVehicle.jsx** - Main ROV implementation with realistic physics:
- Vehicle-style controls (forward/back thrust, left/right rotation)
- Momentum-based movement with damping
- Independent vertical controls
- Completely invisible in first-person view

**MarineCreature.jsx** - Interactive 3D marine life:
- Loads GLTF models from `/src/assets/models/`
- Click detection with discovery mechanics
- Animated floating behavior
- Hover effects with cursor feedback

**VehicleCamera.jsx** - First-person camera system:
- Follows ROV position with offset
- Smooth camera movement
- Integrated with ROV physics

### Controls
- **W/S** - Forward/Backward thrust
- **A/D** - Rotate left/right
- **Space** - Ascend
- **Shift** - Descend

### 3D Assets
- Marine creature models: Snail.glb, seacrab.glb, seacucumber.glb
- Environment models: coral sets, rocks
- Seafloor texture: sandfloor.jpg

### Physics and Movement
The ROV uses realistic vehicle physics with:
- Thrust-based propulsion in forward direction
- Angular velocity for rotation
- Momentum and damping for realistic feel
- Speed limits and world boundaries (-10 to 5 Y-axis)

### Species Discovery System
- Click on marine creatures to "discover" them
- Species counter tracks discoveries (3 total species)
- ROVCameraUI displays progress and HUD elements

## Development Notes

- All 3D models are loaded via GLTFLoader from three.js
- The ROV is invisible in first-person mode - only its light and physics exist
- Camera follows ROV with fixed offset for immersive first-person view
- Marine creatures have invisible hitboxes for click detection
- Uses Suspense for 3D model loading
- Environment includes fog, lighting, and underwater atmosphere