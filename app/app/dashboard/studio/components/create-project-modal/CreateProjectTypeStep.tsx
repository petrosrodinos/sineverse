import { ProjectTypeSelectionCards } from "@/config/dropdowns/project/create-project-type.options";
import { ProjectType, ProjectTypes } from "@/features/projects/interfaces/projects.interfaces";
import { Clapperboard, Building2 } from "lucide-react";

const typeIcon = (type: ProjectType) => {
    if (type === ProjectTypes.FILM) {
        return Clapperboard;
    }
    return Building2;
};

export function CreateProjectTypeStep({
    selected,
    onSelect,
}: {
    selected: ProjectType | null;
    onSelect: (type: ProjectType) => void;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:items-stretch">
            {ProjectTypeSelectionCards.map((card) => {
                const Icon = typeIcon(card.type);
                const isSelected = selected === card.type;
                return (
                    <button
                        key={card.type}
                        type="button"
                        onClick={() => onSelect(card.type)}
                        className={`group text-left rounded-2xl border p-6 min-h-[168px] h-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                            isSelected
                                ? "border-primary bg-gradient-to-br from-primary/15 to-primary/5 ring-2 ring-primary shadow-lg shadow-primary/15"
                                : "border-default-200 bg-content1/30 hover:border-primary/40 hover:bg-content1/60"
                        }`}
                    >
                        <div className="flex flex-col gap-3">
                            <div
                                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                                    isSelected
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-default-100 text-default-600 group-hover:bg-primary/15 group-hover:text-primary"
                                }`}
                            >
                                <Icon className="h-6 w-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
                                <p className="text-sm text-default-500 mt-1.5 leading-relaxed">{card.description}</p>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
