type MaterialIconProps = {
  name: string;
  filled?: boolean;
  className?: string;
};

const iconPaths: Record<string, string> = {
  explore: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.8 6.2-2.1 5.5-5.5 2.1 2.1-5.5 5.5-2.1Z",
  photo_camera: "M4 8.5A2.5 2.5 0 0 1 6.5 6H9l1.4-2h3.2L15 6h2.5A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Zm8 7.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z",
  flip_camera_ios: "M20 5h-3.2l-1.6-2H8.8L7.2 5H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM9 8h6.2l-1.8-1.8L14.8 4.8 19 9l-4.2 4.2-1.4-1.4L15.2 10H9V8Zm6 9H8.8l1.8 1.8-1.4 1.4L5 16l4.2-4.2 1.4 1.4L8.8 15H15v2Z",
  delete: "M7 21a2 2 0 0 1-2-2V7h14v12a2 2 0 0 1-2 2H7ZM9 4l1-1h4l1 1h4v2H5V4h4Zm0 6v7h2v-7H9Zm4 0v7h2v-7h-2Z",
  view_in_ar: "M12 2 4 6v12l8 4 8-4V6l-8-4Zm0 2.2 5.4 2.7L12 9.6 6.6 6.9 12 4.2ZM6 8.5l5 2.5v7.8l-5-2.5V8.5Zm7 10.3V11l5-2.5v7.8l-5 2.5Z",
  event_note: "M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2Zm12 8H5v9h14v-9ZM7 12h8v2H7v-2Zm0 4h5v2H7v-2Z",
  landscape: "M3 19h18L14 8l-4.5 6L7 11 3 19Z",
  temple_buddhist: "M12 3 4 8v2h16V8l-8-5ZM5 11v8H3v2h18v-2h-2v-8h-3v8h-2v-8h-4v8H8v-8H5Z",
  cloud_download: "M8 19h9a5 5 0 0 0 .5-10A6.5 6.5 0 0 0 5 10.5 4.5 4.5 0 0 0 8 19Zm4-8h2v4l2-2 1.4 1.4L13 18.8l-4.4-4.4L10 13l2 2v-4Z",
  security: "M12 2 5 5v6c0 4.4 2.8 8.4 7 10 4.2-1.6 7-5.6 7-10V5l-7-3Zm-1 13.2-3-3 1.4-1.4 1.6 1.6 4.6-4.6L17 9.2l-6 6Z",
  person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0H4Z",
  arrow_forward: "M12 4 10.6 5.4 16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8-8-8Z",
  play_circle: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 14V8l6 4-6 4Z",
  verified_user: "M12 2 5 5v6c0 4.4 2.8 8.4 7 10 4.2-1.6 7-5.6 7-10V5l-7-3Zm-1 13-3-3 1.4-1.4L11 12.2l3.6-3.6L16 10l-5 5Z",
  route: "M6 4a3 3 0 1 0 0 6h6a2 2 0 1 1 0 4H9a3 3 0 1 0 0 2h3a4 4 0 0 0 0-8H6a1 1 0 1 1 0-2h9.2l-1.6 1.6L15 9l4-4-4-4-1.4 1.4L15.2 4H6Z",
  directions_walk: "M13 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-2.2 1.3L8 11v4h2v-3.4l1.1-1.8 1.9 2.2V20h2v-6.7l-2.1-2.4.6-3A6.8 6.8 0 0 0 18 10V8a4.8 4.8 0 0 1-3.8-1.9l-.6-.7a2 2 0 0 0-2.8.9ZM7 20l3-5-1.7-1-3.1 5.1L7 20Z",
  headphones: "M4 13a8 8 0 1 1 16 0v5a3 3 0 0 1-3 3h-2v-8h3a6 6 0 0 0-12 0h3v8H7a3 3 0 0 1-3-3v-5Z",
  translate: "M12.9 15.5a13.7 13.7 0 0 1-3-2.4 13 13 0 0 0 2.4-4.1H15V7H9V5H7v2H1v2h9.1A10.6 10.6 0 0 1 8.5 11a10.5 10.5 0 0 1-1.2-1.8H5.1a13 13 0 0 0 2 3.8l-4 4 1.4 1.4 3.9-3.9a16.2 16.2 0 0 0 3.4 2.7l1.1-1.7ZM17 10h2l4 11h-2.1l-.8-2.3h-4.2L15.1 21H13l4-11Zm-.4 6.8h2.8L18 12.7l-1.4 4.1Z",
  bookmark_add: "M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1Zm5 4v3H8v2h3v3h2v-3h3V9h-3V6h-2Z",
  document_scanner: "M5 3h5v2H7v3H5V3Zm9 0h5v5h-2V5h-3V3ZM5 16h2v3h3v2H5v-5Zm12 0h2v5h-5v-2h3v-3ZM8 9h8v2H8V9Zm0 4h8v2H8v-2Z",
  chevron_right: "m9 18 6-6-6-6-1.4 1.4L12.2 12l-4.6 4.6L9 18Z",
  hiking: "M13.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 22l3.1-5.4L7 14.5 4.8 18H2.5l3.2-5.2a2 2 0 0 1 3-.5l1 .8 1.4-2.4-2-1.2-1.2 2-1.7-1 1.6-2.7a2 2 0 0 1 2.7-.7l2.4 1.4a2 2 0 0 1 .8 2.7l-1.4 2.4 2 1.7V22h-2v-5.8L10.7 15l-2.4 4.2L8 22H6Zm11-11v11h2V11h-2Z",
  psychology: "M9 2a5 5 0 0 0-5 5v4.1A5 5 0 0 0 7 20h1v2h2v-4H7a3 3 0 0 1-3-3h4v-2H4V9h5V7H4a3 3 0 0 1 3-3h2v18h2V2H9Zm6 0h-2v20h2v-4h2a3 3 0 0 0 3-3V7a5 5 0 0 0-5-5Zm0 2a3 3 0 0 1 3 3h-3V4Zm0 5h3v4h-3V9Zm0 6h3a1 1 0 0 1-1 1h-2v-1Z",
  schedule: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5l4 2-.9 1.8L11 13V7h2Z",
  payments: "M3 6h18v12H3V6Zm2 3v6h14V9H5Zm7 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  navigation: "M12 2 4 22l8-4 8 4L12 2Z",
  auto_awesome: "m12 2 1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2Zm7 10 .9 2.6 2.6.9-2.6.9L19 19l-.9-2.6-2.6-.9 2.6-.9L19 12ZM5 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z",
  check_circle: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5-5 1.4 1.4-6.4 6.4Z",
  block: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM5.8 12A6.2 6.2 0 0 1 16.7 8L8 16.7A6.2 6.2 0 0 1 5.8 12Zm6.2 6.2c-.9 0-1.8-.2-2.6-.6l8.2-8.2A6.2 6.2 0 0 1 12 18.2Z",
  satellite_alt: "M4 4h4v2H6v2H4V4Zm12 0h4v4h-2V6h-2V4ZM4 16h2v2h2v2H4v-4Zm14 0h2v4h-4v-2h2v-2ZM9 9l6 6-2 2-6-6 2-2Zm2-4 8 8-2 2-8-8 2-2Z",
  download: "M11 3h2v8l3-3 1.4 1.4L12 14.8 6.6 9.4 8 8l3 3V3ZM5 19h14v2H5v-2Z",
  share_location: "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z",
  local_police: "M12 2 5 5v5c0 5 3.1 9.3 7 11 3.9-1.7 7-6 7-11V5l-7-3Zm0 5 1.1 2.3 2.5.4-1.8 1.8.4 2.5-2.2-1.2L9.8 14l.4-2.5-1.8-1.8 2.5-.4L12 7Z",
  account_balance: "M12 3 3 8v2h18V8l-9-5ZM5 11v7H3v2h18v-2h-2v-7h-2v7h-3v-7h-4v7H7v-7H5Z",
  call: "M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11.5 11.5 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.4a1 1 0 0 1 1 1 11.5 11.5 0 0 0 .6 3.6 1 1 0 0 1-.2 1l-2.2 2.2Z",
  sos: "M4 7h16v10H4V7Zm3 3v4h2v-1h1v1h2v-4H7Zm2 1.5h1v1H9v-1Zm4.5-1.5a2 2 0 0 0 0 4H15a2 2 0 0 0 0-4h-1.5Zm0 1.5H15a.5.5 0 0 1 0 1h-1.5a.5.5 0 0 1 0-1Z",
  menu: "M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z",
  close: "M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z",
  chat: "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2Zm3 5v2h10V9H7Zm0 4v2h7v-2H7Z",
  restaurant: "M8 2v7a2 2 0 0 1-2 2v11H4V11a2 2 0 0 1-2-2V2h2v6h1V2h2v6h1V2h2Zm6 0c-1.7 0-3 2-3 5 0 2.2 1 3.6 2 4v9h2V11c1-.4 2-1.8 2-4 0-3-1.3-5-3-5Z",
  store: "M4 4h16l1.5 5v1a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-5-2V9L4 4Zm0 9.7V20h7v-4h2v4h7v-6.3a4.9 4.9 0 0 1-4-1 5 5 0 0 1-5 0 5 5 0 0 1-5 0 4.9 4.9 0 0 1-2 1Z",
  park: "M12 2 5 14h4l-3 6h12l-3-6h4L12 2Zm-1 18h2v2h-2v-2Z",
  location_city: "M11 7V3H3v18h18V7H11ZM7 19H5v-2h2v2Zm0-4H5v-2h2v2Zm0-4H5V9h2v2Zm0-4H5V5h2v2Zm12 12h-6v-2h2v-2h-2v-2h2v-2h-2V9h6v10Zm-2-8h-2v2h2v-2Zm0 4h-2v2h2v-2Z",
  cabin: "M12 3 2 11h3v9h14v-9h3L12 3Zm0 5.5 4 3.2V18h-3v-4h-2v4H8v-6.3l4-3.2Z",
};

export function MaterialIcon({ name, className = "" }: MaterialIconProps) {
  const path = iconPaths[name] ?? iconPaths.explore;

  return (
    <svg className={`inline-block size-6 shrink-0 ${className}`} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d={path} />
    </svg>
  );
}
