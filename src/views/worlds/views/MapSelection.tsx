import { useParams } from "react-router-dom";
import { MapCard } from "../components/MapCard";
import { MapSection } from "../components/MapSection";
import LoadingView from "@/views/loading/LoadingView";
import { useLoaderStore } from "@/views/loading/stores/loadingStore";
import { useWorldStore } from "../store/worldStore";
import { GNavbar } from "@/global/components/GNavbar";

function MapSelection() {
  const { name: worldName } = useParams();
  const { isLoading } = useLoaderStore();
  const { selectedWorld } = useWorldStore();

  const maps = selectedWorld.maps.filter((map) => map.grade !== "BOSS");
  const bossMap = selectedWorld.maps.filter((map) => map.grade === "BOSS")[0];

  return (
    <>
      {isLoading && <LoadingView title={worldName ?? ""}></LoadingView>}
      <GNavbar title={worldName ?? ""} backTo="/worlds"></GNavbar>
      <span className="flex flex-col items-center justify-center w-full h-full">
        {maps.length > 0 && (
          <>
            <MapSection backgroundUrl={maps[0].backgroundUrl ?? ""}>
              {maps.map((map, index) => (
                <MapCard
                  key={index}
                  name={map.name}
                  cardImageUrl={map.cardImageUrl}
                  details={map.details ?? ""}
                  entitiesLevel={map.entitiesLevel}
                  grade={"COMMON"}
                  backgroundUrl={map.backgroundUrl}
                  enemiesFrontRow={map.enemiesFrontRow}
                  enemiesBackRow={map.enemiesBackRow}
                  soundtrackPath={map.soundtrackPath}
                />
              ))}
            </MapSection>
            <MapSection backgroundUrl={bossMap.backgroundUrl ?? ""}>
              <MapCard
                name={bossMap.name}
                cardImageUrl={bossMap.cardImageUrl}
                details={bossMap.details ?? ""}
                entitiesLevel={bossMap.entitiesLevel}
                grade="BOSS"
                boss={bossMap.boss}
                backgroundUrl={bossMap.backgroundUrl}
                enemiesFrontRow={bossMap.enemiesFrontRow}
                enemiesBackRow={bossMap.enemiesBackRow}
                soundtrackPath={bossMap.soundtrackPath}
              />
            </MapSection>
          </>
        )}
      </span>
    </>
  );
}

export default MapSelection;
