import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "../../../../components/ui/Drawer/Drawer";
import { EventCreateCard } from "../../components/EventCreateCard/EventCreateCard";
import { EventPhotoPicker } from "../../components/EventPhotoPicker/EventPhotoPicker";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import type { EventFormModel } from "../../models/event.model";
import styles from "./EventCreatePage.module.css";

export default function EventCreatePage() {
  const { submit, isSubmitting } = useCreateEvent();
  const navigate = useNavigate();
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("/cover-default.png");

  async function handleSubmit(data: EventFormModel) {
    if (isSubmitting) return;
    try {
      const event = await submit({
        ...data,
        coverImageUrl,
      });
      navigate(`/events/${event.id}`);
    } catch {
      // error is captured in useAsync state;
      // no navigation on failure
    }
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.bgImage}
        style={{
          backgroundImage: `url(${coverImageUrl})`,
        }}
      />

      <div className={styles.bgOverlay} />

      <div className={styles.cardLayer}>
        <EventCreateCard
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          coverImageUrl={coverImageUrl}
          onSelectCoverImage={setCoverImageUrl}
          onOpenPhotoPicker={() => setIsPhotoPickerOpen(true)}
        />
      </div>

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
