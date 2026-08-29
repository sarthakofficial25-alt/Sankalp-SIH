-- ============================================
-- SURAKSHA-NET PostgreSQL Schema
-- AI-Powered Border Security & Surveillance Platform
-- SIH Problem Statement ID: 26187
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users / Operators
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    rank VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('SUPER_ADMIN', 'COMMANDER', 'SECURITY_OFFICER', 'ANALYST')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Zones (Geofenced virtual boundaries)
CREATE TABLE zones (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    zone_type VARCHAR(50) NOT NULL CHECK (zone_type IN ('AUTHORIZED', 'RESTRICTED', 'HIGH_SECURITY', 'BUFFER')),
    sector VARCHAR(100) NOT NULL,
    boundary_polygon JSONB NOT NULL,
    color_hex VARCHAR(20) NOT NULL,
    max_personnel INT DEFAULT 10
);

-- RF Devices / Transponder Hardware
CREATE TABLE rf_devices (
    id VARCHAR(50) PRIMARY KEY,
    device_id VARCHAR(50) UNIQUE NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    signal_strength INT DEFAULT 100,
    status VARCHAR(50) DEFAULT 'ONLINE' CHECK (status IN ('ONLINE', 'WEAK_SIGNAL', 'OFFLINE', 'UNKNOWN')),
    authorization_status VARCHAR(50) DEFAULT 'AUTHORIZED' CHECK (authorization_status IN ('AUTHORIZED', 'UNAUTHORIZED', 'PENDING', 'REVOKED')),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_sector VARCHAR(100)
);

-- Personnel / Deployed Officers
CREATE TABLE personnel (
    id VARCHAR(50) PRIMARY KEY,
    service_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    rank VARCHAR(50) NOT NULL,
    role VARCHAR(100) NOT NULL,
    assigned_sector VARCHAR(100) NOT NULL,
    assigned_zone_id VARCHAR(50) REFERENCES zones(id),
    rf_device_id VARCHAR(50) REFERENCES rf_devices(id),
    authorization_status VARCHAR(50) DEFAULT 'AUTHORIZED',
    status VARCHAR(50) DEFAULT 'ON_PATROL' CHECK (status IN ('ON_PATROL', 'AT_POST', 'OFF_DUTY', 'IN_TRANSIT', 'UNKNOWN')),
    biometric_face_embedding JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CCTV Cameras / Edge Optical Sensors
CREATE TABLE cameras (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    status VARCHAR(50) DEFAULT 'ONLINE' CHECK (status IN ('ONLINE', 'DEGRADED', 'OFFLINE', 'MAINTENANCE')),
    resolution VARCHAR(50) DEFAULT '4K',
    ai_enabled BOOLEAN DEFAULT TRUE,
    last_heartbeat TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optical & RF Correlated Detections
CREATE TABLE detections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    track_id VARCHAR(50) NOT NULL,
    camera_id VARCHAR(50) REFERENCES cameras(id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confidence NUMERIC(5, 2) NOT NULL,
    visual_status VARCHAR(50) NOT NULL,
    rf_status VARCHAR(50) NOT NULL,
    location VARCHAR(150) NOT NULL,
    zone_id VARCHAR(50) REFERENCES zones(id),
    threat_score INT NOT NULL,
    threat_level VARCHAR(50) NOT NULL CHECK (threat_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    bounding_box JSONB NOT NULL,
    personnel_id VARCHAR(50) REFERENCES personnel(id),
    rf_device_id VARCHAR(50) REFERENCES rf_devices(id)
);

-- Tactical Alerts
CREATE TABLE alerts (
    id VARCHAR(50) PRIMARY KEY,
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('INFORMATIONAL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    location VARCHAR(150) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ACKNOWLEDGED', 'ESCALATED', 'DISMISSED', 'RESOLVED')),
    track_id VARCHAR(50),
    camera_id VARCHAR(50) REFERENCES cameras(id),
    rf_device_id VARCHAR(50) REFERENCES rf_devices(id),
    threat_score INT NOT NULL,
    assigned_officer VARCHAR(150),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Incidents Dossier
CREATE TABLE incidents (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    location VARCHAR(150) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    threat_level VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'DETECTED' CHECK (status IN ('DETECTED', 'UNDER_REVIEW', 'ACKNOWLEDGED', 'RESOLVED')),
    camera_id VARCHAR(50) REFERENCES cameras(id),
    track_id VARCHAR(50) NOT NULL,
    rf_device_id VARCHAR(50) REFERENCES rf_devices(id),
    assigned_officer VARCHAR(150),
    evidence JSONB DEFAULT '[]'::jsonb,
    timeline JSONB DEFAULT '[]'::jsonb,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Cryptographic Audit Log
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id VARCHAR(50),
    user_name VARCHAR(150),
    action VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    severity VARCHAR(50) NOT NULL
);
