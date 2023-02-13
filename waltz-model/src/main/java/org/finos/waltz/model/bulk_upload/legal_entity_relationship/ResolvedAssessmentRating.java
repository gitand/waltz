package org.finos.waltz.model.bulk_upload.legal_entity_relationship;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.finos.waltz.model.bulk_upload.ResolutionStatus;
import org.finos.waltz.model.rating.RatingSchemeItem;
import org.immutables.value.Value;

import java.util.Optional;
import java.util.Set;

@Value.Immutable
@JsonSerialize(as = ImmutableResolvedAssessmentRating.class)
@JsonDeserialize(as = ImmutableResolvedAssessmentRating.class)
public abstract class ResolvedAssessmentRating {

    public abstract int columnIndex();

    public abstract ResolvedAssessmentHeader assessmentHeader();

    public abstract Optional<String> comment(); //can be provided if headerRatingId is present

    public abstract Set<RatingSchemeItem> resolvedRatings(); //can be provided via header rating or listed in cell

    public abstract Set<RatingResolutionError> errors();

    public abstract ResolutionStatus status();

}
