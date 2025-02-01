import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { highlightApi } from '../api/highlight';
import { HighlightWithNotesAndSubHighlightsAndTags } from '../utils/types';

export const useHighlightMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const favoriteHighlight = useMutation({
    mutationFn: ({
      highlightId,
      value,
    }: {
      highlightId: string;
      value: boolean;
    }) => highlightApi.favoriteHighlight(highlightId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while favoriting the highlight',
      });
    },
  });

  const editHighlight = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      highlightApi.editHighlight(id, content),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['highlights'],
        })
        .then(() => {
          toast({
            title: 'Highlight updated',
            description: 'Highlight has been updated',
          });
        });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update highlight',
        variant: 'destructive',
      });
    },
  });

  const deleteHighlight = useMutation({
    mutationFn: highlightApi.deleteHighlight,
    onMutate: async (highlightId) => {
      await queryClient.cancelQueries({ queryKey: ['highlights'] });
      const previousHighlights = queryClient.getQueryData<
        HighlightWithNotesAndSubHighlightsAndTags[]
      >(['highlights']);

      queryClient.setQueryData<HighlightWithNotesAndSubHighlightsAndTags[]>(
        ['highlights'],
        (old = []) => old.filter(({ id }) => id !== highlightId)
      );

      return { previousHighlights };
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['highlights'],
        })
        .then(() => {
          toast({
            title: 'Highlight deleted',
            description: 'Highlight has been deleted',
          });
        });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete highlight',
        variant: 'destructive',
      });
    },
  });

  const createSubHighlight = useMutation({
    mutationFn: ({
      highlightId,
      startIndex,
      endIndex,
    }: {
      highlightId: string;
      startIndex: number;
      endIndex: number;
    }) => highlightApi.createSubhighlight(highlightId, startIndex, endIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] }).then(() => {
        toast({
          title: 'Subhighlight created',
          description: 'Subhighlight created successfully',
        });
      });
    },
    onError: () => {
      toast({
        title: 'Failed to create subhighlight',
        description: 'Failed to create subhighlight',
      });
    },
  });

  const createTag = useMutation({
    mutationFn: ({
      highlightId,
      content,
    }: {
      highlightId: string;
      content: string;
    }) => highlightApi.createHighlightTag(highlightId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] }).then(() => {
        toast({
          title: 'Tag created',
          description: 'Tag created successfully',
        });
      });
    },
    onError: () => {
      toast({
        title: 'Failed to create tag',
        description: 'Failed to create tag',
      });
    },
  });

  const deleteTag = useMutation({
    mutationFn: ({
      highlightId,
      tagId,
    }: {
      highlightId: string;
      tagId: string;
    }) => highlightApi.deleteHighlightTag(highlightId, tagId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] }).then(() => {
        toast({
          title: 'Highlight tag deleted',
          description: 'Highlight tag has been deleted',
        });
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete highlight tag',
        variant: 'destructive',
      });
    },
  });

  const deleteSubHighlight = useMutation({
    mutationFn: highlightApi.deleteSubhighlight,
    onMutate: async (subhighlightId) => {
      await queryClient.cancelQueries({ queryKey: ['highlights'] });
      const previousHighlights = queryClient.getQueryData<
        HighlightWithNotesAndSubHighlightsAndTags[]
      >(['highlights']);

      queryClient.setQueryData<HighlightWithNotesAndSubHighlightsAndTags[]>(
        ['highlights'],
        (old = []) => old.filter(({ id }) => id !== subhighlightId)
      );

      return { previousHighlights };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] }).then(() => {
        toast({
          title: 'Subhighlight deleted',
          description: 'Subhighlight has been deleted',
        });
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete subhighlight',
        variant: 'destructive',
      });
    },
  });

  return {
    favoriteHighlight: favoriteHighlight.mutate,
    editHighlight: editHighlight.mutate,
    createSubHighlight: createSubHighlight.mutate,
    createTag: createTag.mutate,
    deleteTag: deleteTag.mutate,
    deleteHighlight: deleteHighlight.mutate,
    deleteSubHighlight: deleteSubHighlight.mutate,
    isLoading: {
      favoriteHighlight: favoriteHighlight.isPending,
      editHighlight: editHighlight.isPending,
      createSubHighlight: createSubHighlight.isPending,
      createTag: createTag.isPending,
      deleteTag: deleteTag.isPending,
      deleteHighlight: deleteHighlight.isPending,
      deleteSubHighlight: deleteSubHighlight.isPending,
    },
  };
};
