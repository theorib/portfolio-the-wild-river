/* eslint-disable react/no-children-prop */
'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useUpdateCabinById from '@/features/cabins/hooks/useUpdateCabinById';
import { EditCabinFormSchema } from '@/features/cabins/schema';
import type { Cabin } from '@/features/cabins/types';
import logger from '@/features/logger';
import useDeleteImage from '@/features/manage-images/hooks/useDeleteImage';
import useUploadImage from '@/features/manage-images/hooks/useUploadImage';
import { cn } from '@/lib/utils';
import { extractStoragePathFromUrl } from '@/services/supabase/storage/images';
import { useForm } from '@tanstack/react-form';
import { ImageIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

type EditCabinFormProps = {
	cabin: Cabin;
	className?: string;
	onSuccess?: () => void;
};

export default function EditCabinForm({ cabin, className, onSuccess }: EditCabinFormProps) {
	const [imagePreview, setImagePreview] = useState<string | null>(cabin.image);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { mutate: updateCabin, isPending: isUpdatePending } = useUpdateCabinById({
		cabinId: cabin.id,
	});
	const { mutateAsync: uploadImage } = useUploadImage();
	const { mutateAsync: deleteImage } = useDeleteImage();

	const form = useForm({
		formId: 'edit-cabin-form',
		defaultValues: {
			name: cabin.name || '',
			description: cabin.description || '',
			maxCapacity: cabin.maxCapacity || 1,
			regularPrice: cabin.regularPrice || 0,
			discount: cabin.discount || 0,
		},
		onSubmit: async ({ value }) => {
			try {
				// Validate form data
				const validationResult = EditCabinFormSchema.safeParse({
					...value,
					image: selectedFile || cabin.image,
				});

				if (!validationResult.success) {
					const firstError = validationResult.error.issues[0];
					toast.error(firstError?.message || 'Validation error');
					return;
				}

				let imageUrl = cabin.image;

				// Handle image upload if a new file was selected
				if (selectedFile) {
					// Upload new image
					const uploadResult = await uploadImage({
						file: selectedFile,
						bucket: 'cabin-images',
						path: `cabin-${cabin.id}-${Date.now()}.${selectedFile.name.split('.').pop()}`,
					});

					imageUrl = uploadResult.publicUrl;

					// Delete old image if it exists
					if (cabin.image) {
						const oldImagePath = extractStoragePathFromUrl(cabin.image, 'cabin-images');
						if (oldImagePath) {
							await deleteImage({ path: oldImagePath, bucket: 'cabin-images' });
						}
					}
				}

				// Update cabin
				updateCabin(
					{
						cabinId: cabin.id,
						cabinData: {
							name: value.name,
							description: value.description,
							maxCapacity: value.maxCapacity,
							regularPrice: value.regularPrice,
							discount: value.discount || 0,
							image: imageUrl,
						},
					},
					{
						onSuccess: () => {
							toast.success('Cabin updated successfully');
							onSuccess?.();
						},
					},
				);
			} catch (err) {
				const errorMessage = 'Error updating cabin';
				logger.withError(err).error(errorMessage);
				toast.error(errorMessage);
			}
		},
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			// Create preview URL
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<form
			className={cn('grid gap-6', className)}
			id="edit-cabin-form"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<FieldGroup>
				{/* Name Field */}
				<form.Field
					name="name"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Cabin Name</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder="Enter cabin name"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				{/* Description Field */}
				<form.Field
					name="description"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Description</FieldLabel>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder="Enter cabin description"
									rows={4}
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				{/* Max Capacity Field */}
				<form.Field
					name="maxCapacity"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Max Capacity</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="number"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number(e.target.value))}
									aria-invalid={isInvalid}
									min={1}
									placeholder="Enter max capacity"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				{/* Regular Price Field */}
				<form.Field
					name="regularPrice"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Regular Price</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="number"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number(e.target.value))}
									aria-invalid={isInvalid}
									min={0}
									step={0.01}
									placeholder="Enter regular price"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				{/* Discount Field */}
				<form.Field
					name="discount"
					children={(field) => {
						const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Discount (Optional)</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="number"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(Number(e.target.value))}
									aria-invalid={isInvalid}
									min={0}
									step={0.01}
									placeholder="Enter discount"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						);
					}}
				/>

				{/* Image Upload Field */}
				<Field>
					<FieldLabel>Cabin Image</FieldLabel>
					<div className="flex flex-col gap-4">
						{/* Image Preview */}
						<div
							className="bg-muted hover:bg-muted/80 relative flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors"
							onClick={handleImageClick}
						>
							{imagePreview ? (
								<Image
									src={imagePreview}
									alt="Cabin preview"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 400px"
								/>
							) : (
								<div className="text-muted-foreground flex flex-col items-center gap-2">
									<ImageIcon size={48} />
									<span>Click to upload image</span>
								</div>
							)}
							{/* Overlay on hover */}
							<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
								<div className="flex flex-col items-center gap-2 text-white">
									<Upload size={32} />
									<span className="text-sm">Change Image</span>
								</div>
							</div>
						</div>

						{/* Hidden file input */}
						<input
							ref={fileInputRef}
							type="file"
							accept="image/jpeg,image/jpg,image/png,image/webp"
							onChange={handleFileChange}
							className="hidden"
						/>

						<p className="text-muted-foreground text-xs">
							Supported formats: JPEG, PNG, WebP. Max size: 5MB
						</p>
					</div>
				</Field>
			</FieldGroup>

			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
				children={([canSubmit, isSubmitting]) => {
					const isProcessing = isSubmitting || isUpdatePending;
					return (
						<Button type="submit" disabled={!canSubmit || isProcessing} className="w-full">
							{isProcessing ? 'Updating...' : 'Update Cabin'}
						</Button>
					);
				}}
			/>
		</form>
	);
}
