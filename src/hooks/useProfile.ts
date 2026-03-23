'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserProfile {
  name: string;
  avatarId: string;
  tag: string;
}

const STORAGE_KEY = 'codlearn_profile';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  avatarId: 'hacker',
  tag: '',
};

function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const setName = useCallback((name: string) => {
    setProfile((prev) => {
      const next = { ...prev, name };
      saveProfile(next);
      return next;
    });
  }, []);

  const setAvatarId = useCallback((avatarId: string) => {
    setProfile((prev) => {
      const next = { ...prev, avatarId };
      saveProfile(next);
      return next;
    });
  }, []);

  const setTag = useCallback((tag: string) => {
    setProfile((prev) => {
      const next = { ...prev, tag };
      saveProfile(next);
      return next;
    });
  }, []);

  return { profile, setName, setAvatarId, setTag };
}
