import { useParams } from "react-router-dom";
import { MapCard } from "../components/MapCard";
import { MapSection } from "../components/MapSection";
import LoadingView from "@/views/loading/LoadingView";
import { useLoaderStore } from "@/views/loading/stores/loadingStore";
import { useWorldStore } from "../store/worldStore";

function MapSelection() {
  const { name: worldName } = useParams();
  const { isLoading } = useLoaderStore();
  const { selectedWorld } = useWorldStore();

  const maps = selectedWorld.maps.filter((map) => map.grade !== "BOSS");
  const bossMap = selectedWorld.maps.filter((map) => map.grade === "BOSS")[0];

  return (
    <>
      {isLoading && <LoadingView title={worldName ?? ""}></LoadingView>}
      <span className="flex flex-col items-center justify-center w-full h-full">
        <section className="flex justify-center items-center mb-10">
          <h1 className="text-4xl mt-10 py-2 px-32 border-2 border-white rounded-xl">
            {worldName}
          </h1>
        </section>
        {maps.length > 0 && (
          <>
            <MapSection backgroundUrl={maps[0].backgroundUrl ?? ""}>
              {maps.map((map, index) => (
                <MapCard
                  key={index}
                  name={map.name}
                  cardImageUrl={map.cardImageUrl}
                  details={map.details ?? ""}
                  entitiesLevel={[1, 10]}
                  grade={"COMMON"}
                  backgroundUrl={map.backgroundUrl}
                  enemyFrontRow={map.enemyFrontRow}
                  enemyBackRow={map.enemyBackRow}
                  soundtrackPath={map.soundtrackPath}
                />
              ))}
            </MapSection>
            <MapSection backgroundUrl={bossMap.backgroundUrl ?? ""}>
              <MapCard
                name={bossMap.name}
                cardImageUrl={bossMap.cardImageUrl}
                details={bossMap.details ?? ""}
                entitiesLevel={[1, 10]}
                grade="BOSS"
                boss={bossMap.boss}
                backgroundUrl={bossMap.backgroundUrl}
                enemyFrontRow={bossMap.enemyFrontRow}
                enemyBackRow={bossMap.enemyBackRow}
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
