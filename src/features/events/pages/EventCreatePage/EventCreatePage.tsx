import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventCreateCard } from "../../components/EventCreateCard/EventCreateCard";
import { EventPhotoPicker } from "../../components/EventPhotoPicker/EventPhotoPicker";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import type { EventFormModel } from "../../models/event.model";
import styles from "./EventCreatePage.module.css";
import { Drawer } from "../../../../components/ui/Drawer/Drawer";

export default function EventCreatePage() {
  const { submit, isSubmitting } = useCreateEvent();
  const navigate = useNavigate();

  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [coverImageUrl, setCoverImageUrl] =
    useState<string>("/cover-default.png");

  async function handleSubmit(data: EventFormModel) {
    if (isSubmitting) return;

    try {
      const event = await submit({
        ...data,
        coverImageUrl,
      });

      navigate(`/events/${event.id}`);
    } catch {
      // error is captured in useAsync state; no navigation on failure
    }
  }

  return (
    <div className={styles.page}>
      {coverImageUrl && (
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${coverImageUrl})` }}
        />
      )}
      <div className={styles.bgOverlay} />
      <EventCreateCard
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        coverImageUrl={coverImageUrl}
        onSelectCoverImage={setCoverImageUrl}
        onOpenPhotoPicker={() => setIsPhotoPickerOpen(true)}
      />

      {isPhotoPickerOpen && (
        <div
          className={styles.drawerBackdrop}
          onClick={() => setIsPhotoPickerOpen(false)}
        />
      )}
      <Drawer isOpen={isPhotoPickerOpen} className={styles.photoDrawer}>
        <EventPhotoPicker
          onBack={() => setIsPhotoPickerOpen(false)}
          onSelectPhoto={(url) => {
            setCoverImageUrl(url);
            setIsPhotoPickerOpen(false);
          }}
        />
      </Drawer>
    </div>
  );
}
