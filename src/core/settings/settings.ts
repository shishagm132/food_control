import { derived, writable } from "svelte/store";
import { storage } from "../customStores/storage";
import Convert from "../Convert";

type Settings = {
  useKj: boolean;
  kjNormMin: number;
  kjNormMax: number;
};

const SETTINGS_KEY = "SETTINGS_KEY";

const defaultSettings: Settings = {
  useKj: true,
  kjNormMin: 7531.2,
  kjNormMax: 11700,
};

export const SETTINGS_KEYS = {
  useKj: "SK_USE_KJ",
  kjNormMin: "SK_KJ_NORM_MIN",
  kjNormMax: "SK_KJ_NORM_MAX",
} as const;

export const useKj = storage(writable(false), SETTINGS_KEYS.useKj);

export const kjNormMin = storage(
  writable(defaultSettings.kjNormMin),
  SETTINGS_KEYS.kjNormMin
);

export const kjNormMax = storage(
  writable(defaultSettings.kjNormMax),
  SETTINGS_KEYS.kjNormMax
);

export const updateKjNormMax = derived(useKj, (isKj) =>
  isKj
    ? (kj: number) => kjNormMax.set(kj)
    : (kcall: number) => kjNormMax.set(Convert.fromKCaloriesToKj(kcall))
);

export const updateKjNormMin = derived(useKj, (isKj) =>
  isKj
    ? (kj: number) => kjNormMin.set(kj)
    : (kcall: number) => kjNormMin.set(Convert.fromKCaloriesToKj(kcall))
);
